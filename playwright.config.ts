import { defineConfig, devices } from '@playwright/test';
import { loadRuntimeEnvironment } from './src/config/environment';

// Tests must be started through the custom runner (npm test -- <flags>), which sets RUN_VIA_RUNNER.
if (!process.env.RUN_VIA_RUNNER) {
  throw new Error(
    'Run tests through the custom runner, for example: npm test -- --suite all --env qa (see npm test -- --help).',
  );
}

const runtime = loadRuntimeEnvironment();
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './src/tests/ui',
  testMatch: '**/*.spec.ts',

  fullyParallel: true,
  forbidOnly: isCI,

  retries: isCI ? Math.max(runtime.retries, 1) : runtime.retries,
  workers: isCI ? 2 : 1,
  timeout: runtime.testTimeout,
  expect: {
    timeout: runtime.expectTimeout,
  },

  // Generate both the interactive HTML report and machine-readable JSON.
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
    [
      'json',
      {
        outputFile: 'test-results/results.json',
      },
    ],
  ],

  outputDir: 'test-results',

  use: {
    baseURL: runtime.baseURL,
    testIdAttribute: 'data-test',

    // Show the browser locally, but use headless mode in GitHub Actions.
    headless: isCI,

    // Slow down browser actions locally so you can follow them.
    launchOptions: {
      slowMo: isCI ? 0 : 1000,
    },

    actionTimeout: runtime.actionTimeout,
    navigationTimeout: runtime.navigationTimeout,

    // Capture debugging evidence when a test fails.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    ignoreHTTPSErrors: false,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Enable these projects when you need cross-browser testing.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});