#!/usr/bin/env node
import { spawn } from 'node:child_process';

const suitePaths = {
  all: [],
  auth: ['src/tests/ui/authentication.spec.ts'],
  authentication: ['src/tests/ui/authentication.spec.ts'],
  inventory: ['src/tests/ui/inventory.spec.ts'],
  shopping: ['src/tests/ui/shopping.spec.ts'],
};
const validEnvironments = new Set(['local', 'qa', 'prod']);
const validBrowsers = new Set(['chromium', 'firefox', 'webkit']);

function parseArgs(argv) {
  const options = { env: process.env.TARGET_ENV ?? process.env.ENV ?? 'local', browser: 'chromium', suite: 'all', headed: false, allowProductionWrites: false };
  const passthrough = [];
  const valueOptions = new Set(['--env', '--ENV', '--browser', '--project', '--suite', '--case', '--test-name', '--grep', '--grep-invert', '--path']);

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const equalAt = token.indexOf('=');
    const name = equalAt > -1 ? token.slice(0, equalAt) : token;
    let value = equalAt > -1 ? token.slice(equalAt + 1) : undefined;

    if (name === '--headed') { options.headed = true; continue; }
    if (name === '--headless') { options.headed = false; continue; }
    if (name === '--allow-production-writes') { options.allowProductionWrites = true; continue; }
    if (name === '--help' || name === '-h') { options.help = true; continue; }

    if (valueOptions.has(name)) {
      if (value === undefined) {
        value = argv[index + 1];
        if (!value || value.startsWith('--')) throw new Error(`Missing value after ${name}.`);
        index += 1;
      }
      switch (name.toLowerCase()) {
        case '--env': options.env = value.toLowerCase(); break;
        case '--browser': options.browser = value.toLowerCase(); break;
        case '--project': options.browser = value; options.projectExplicit = true; break;
        case '--suite': options.suite = value.toLowerCase(); break;
        case '--case': options.caseId = value; break;
        case '--test-name': options.testName = value; break;
        case '--grep': options.grep = value; break;
        case '--grep-invert': options.grepInvert = value; break;
        case '--path': options.path = value; break;
        default: break;
      }
      continue;
    }

    // Keep useful native Playwright flags available (e.g. --workers=1 or --debug).
    passthrough.push(token);
  }
  options.passthrough = passthrough;
  return options;
}

function printHelp() {
  console.log(`\nPlaywright framework runner\n\nUsage:\n  npm test -- [options]\n\nOptions:\n  --env local|qa|prod              Select .env, .env.qa, or .env.prod (default: local)\n  --suite all|auth|inventory|shopping Select a suite (default: all)\n  --case TC-AUTO-001               Run a documented automated case by ID\n  --test-name <text>               Filter by test title\n  --browser chromium|firefox|webkit Select browser project (default: chromium)\n  --project <name>                 Alias for browser project selection\n  --headed | --headless            Display browser or run headlessly (default: headless)\n  --path <file-or-folder>          Run a specific spec path\n  --allow-production-writes        Explicitly permit the checkout test in prod\n  --help                           Show this help\n\nExamples:\n  npm test -- --suite all --env qa --browser chromium\n  npm test -- --case TC-AUTO-004 --env local --headed\n  npm test -- --suite auth --browser firefox --headless\n  npm test -- --env prod --suite all\n`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) { printHelp(); return; }
  if (!validEnvironments.has(options.env)) throw new Error(`Invalid environment "${options.env}". Use local, qa, or prod.`);
  if (!validBrowsers.has(options.browser)) throw new Error(`Invalid browser/project "${options.browser}". Use chromium, firefox, or webkit.`);
  if (!Object.hasOwn(suitePaths, options.suite)) throw new Error(`Unknown suite "${options.suite}". Use all, auth, inventory, or shopping.`);
  if (options.caseId && options.testName) throw new Error('Use either --case or --test-name, not both.');
  if (options.allowProductionWrites && options.env !== 'prod') {
    console.warn('[runner] --allow-production-writes has no effect outside the prod profile.');
  }

  const commandArgs = ['playwright', 'test'];
  const paths = options.path ? [options.path] : suitePaths[options.suite];
  commandArgs.push(...paths);
  commandArgs.push(`--project=${options.browser}`);
  if (options.headed) commandArgs.push('--headed');

  const grepValues = [options.caseId, options.testName, options.grep].filter(Boolean);
  if (grepValues.length > 1) throw new Error('Use only one of --case, --test-name, or --grep.');
  if (options.caseId) commandArgs.push('--grep', options.caseId);
  else if (options.testName) commandArgs.push('--grep', options.testName);
  else if (options.grep) commandArgs.push('--grep', options.grep);
  if (options.grepInvert) commandArgs.push('--grep-invert', options.grepInvert);

  if (options.env === 'prod' && !options.allowProductionWrites) {
    console.warn('[runner] Production safety is ON: the fixture guard will skip @production-unsafe cases and report them as skipped.');
  }
  commandArgs.push(...options.passthrough);

  const env = {
    ...process.env,
    TARGET_ENV: options.env,
    RUN_VIA_RUNNER: '1',
    ALLOW_PRODUCTION_WRITES: options.allowProductionWrites ? 'true' : (process.env.ALLOW_PRODUCTION_WRITES ?? 'false'),
  };
  const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  console.log(`[runner] Environment: ${options.env}`);
  console.log(`[runner] Browser project: ${options.browser}`);
  console.log(`[runner] Command: ${executable} ${commandArgs.join(' ')}`);

  const child = spawn(executable, commandArgs, { stdio: 'inherit', env, shell: process.platform === 'win32' });
  child.on('error', (error) => {
    console.error(`[runner] Failed to launch Playwright: ${error.message}`);
    process.exitCode = 1;
  });
  child.on('exit', (code, signal) => {
    if (signal) {
      console.error(`[runner] Playwright stopped by signal ${signal}.`);
      process.exitCode = 1;
    } else {
      process.exitCode = code ?? 1;
    }
  });
}

main().catch((error) => {
  console.error(`[runner] ${error.message}`);
  process.exitCode = 2;
});
