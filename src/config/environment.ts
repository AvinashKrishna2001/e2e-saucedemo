import path from 'node:path';
import dotenv from 'dotenv';

export type TargetEnvironment = 'local' | 'qa' | 'prod';

const allowedEnvironments: TargetEnvironment[] = ['local', 'qa', 'prod'];

export function loadRuntimeEnvironment(): {
  name: TargetEnvironment;
  baseURL: string;
  testTimeout: number;
  expectTimeout: number;
  actionTimeout: number;
  navigationTimeout: number;
  retries: number;
} {
  const requested = (process.env.TARGET_ENV ?? process.env.ENV ?? 'local').toLowerCase();
  if (!allowedEnvironments.includes(requested as TargetEnvironment)) {
    throw new Error(`Unknown environment "${requested}". Expected one of: ${allowedEnvironments.join(', ')}.`);
  }

  const name = requested as TargetEnvironment;
  const fileName = name === 'local' ? '.env' : `.env.${name}`;
  dotenv.config({ path: path.resolve(process.cwd(), fileName), override: false, quiet: true });
  process.env.TARGET_ENV = name;

  const defaults = {
    local: 'https://www.saucedemo.com',
    qa: 'https://www.saucedemo.com',
    prod: 'https://www.saucedemo.com',
  };
  const numberFromEnv = (key: string, fallback: number, allowZero = false): number => {
    const raw = process.env[key];
    if (!raw) return fallback;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0 || (!allowZero && parsed === 0)) throw new Error(`${key} must be ${allowZero ? 'a non-negative' : 'a positive'} number.`);
    return parsed;
  };

  return {
    name,
    baseURL: process.env.BASE_URL || defaults[name],
    testTimeout: numberFromEnv('TEST_TIMEOUT_MS', 30_000),
    expectTimeout: numberFromEnv('EXPECT_TIMEOUT_MS', 8_000),
    actionTimeout: numberFromEnv('ACTION_TIMEOUT_MS', 10_000),
    navigationTimeout: numberFromEnv('NAVIGATION_TIMEOUT_MS', 20_000),
    retries: numberFromEnv('RETRIES', 0, true),
  };
}
