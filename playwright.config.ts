import { defineConfig, devices } from '@playwright/test';
import { loadRuntimeEnvironment } from './src/config/environment';

const runtime = loadRuntimeEnvironment();
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './src/tests/ui',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? Math.max(runtime.retries, 1) : runtime.retries,
  workers: isCI ? 2 : undefined,
  timeout: runtime.testTimeout,
  expect: { timeout: runtime.expectTimeout },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: runtime.baseURL,
    testIdAttribute: 'data-test',
    headless: true,
    actionTimeout: runtime.actionTimeout,
    navigationTimeout: runtime.navigationTimeout,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
