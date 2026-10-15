# Research notes and architecture decisions

Research performed: 15 October 2026. The repositories below were reviewed for patterns and domain workflow ideas; this project is an independent implementation tailored to the 15-case requirement, not a copy of an existing repository.

## Public references reviewed

### 1. Microsoft Playwright examples

Repository: https://github.com/microsoft/playwright-examples

The repository demonstrates Playwright Test setup, a conventional project-level Playwright configuration, and a GitHub Actions workflow. The workflow installs Node dependencies and Playwright browsers, runs the tests, and uploads the HTML report as an artifact. These practices informed this project's workflow and reporter setup. The repository currently appears archived, so it is treated as an example repository rather than assumed to be an actively maintained template.

Related files:
- https://github.com/microsoft/playwright-examples/blob/main/playwright.config.ts
- https://github.com/microsoft/playwright-examples/blob/main/.github/workflows/playwright.yml

### 2. Microsoft Playwright documentation: fixtures

Documentation: https://playwright.dev/docs/test-fixtures

Playwright fixtures scope setup/teardown around a test and keep each test isolated. The custom `authenticatedShopper` and `checkoutReadyShopper` fixtures follow that model and are available for independent tests. The shopping specs (`TC-AUTO-005`, `014`, `006`, `015`, `007`) deliberately do the opposite: they run in serial mode (`test.describe.serial`) on one shared page, so each test depends on the state left by the one before it.

### 3. Microsoft Playwright documentation: Page Object Model

Documentation: https://playwright.dev/docs/pom

The POM pattern encapsulates selectors and reusable actions in page classes. This project uses `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage`; assertions about test intent remain primarily in spec files.

### 4. Microsoft Playwright CI guidance

Documentation: https://playwright.dev/docs/ci-intro

The CI workflow follows the documented lifecycle: check out source, set up Node, install packages, install browser dependencies, run tests, and upload reports/results even if the test step fails. This implementation invokes the custom runner rather than only invoking the generic test command.

### 5. Existing SauceDemo Playwright + TypeScript sample

Repository reviewed: https://github.com/alanrychert/saucedemo-playwright-typescript

This domain-specific repository uses Playwright Test, TypeScript, POM, and HTML reporting for the same public storefront. It confirmed that SauceDemo provides meaningful login, inventory, and cart flows for a portfolio exercise. The test cases, environment profile logic, safety guard, runner, case repository, and workflow in this project were implemented separately.

Another SauceDemo + TypeScript sample was reviewed as a secondary structure reference: https://github.com/bibas07/SauceDemo-Playwright

## Decisions and trade-offs

| Area | Decision | Rationale / limitation |
|---|---|---|
| Application | SauceDemo | Public demo supports realistic storefront journeys and well-defined validation behavior. It is a shared demo, not a private QA tenant. |
| Framework | Playwright Test + TypeScript | Strong locator/assertion APIs, browser projects, fixture lifecycle, retries, traces, and first-party CI support. |
| Page objects | One class per core page | Centralizes selector and action maintenance without adding a generic base-class hierarchy that the small project does not need. |
| Test independence | Authentication and inventory cases initialize their own state | These tests can run by ID or in parallel without relying on test ordering. |
| Dependency demonstration | Serial chain in `shopping.spec.ts` | `TC-AUTO-005` → `014` → `006` → `015` → `007` share one browser session. A later test run alone fails, and a failure skips the rest of the chain. Trade-off: less isolation and harder debugging, in exchange for demonstrating order-dependent tests. |
| Environment profiles | `.env`, `.env.qa`, `.env.prod` | Same hosted URL because SauceDemo does not provide separate user-configurable deployments in this sample; users must replace URLs for genuine environments. |
| Production safety | Checkout tagged and guarded | A checkout completion changes the demo session/order state. The runner excludes it by default in `prod`; a fixture guard also protects direct Playwright runs. |
| CI browser | Chromium | Limits installation time and keeps the canonical seven-case CI run fast; Firefox and WebKit remain selectable locally. |
| Retries | Zero locally, conservative CI retry | Helps tolerate occasional CI timing/network variance without hiding local failures. Traces are retained on failures for diagnosis. |

## Caveats

Public demo sites can change, throttle automated traffic, or be temporarily unavailable. An external site being inaccessible from an authoring environment is not evidence of a test failure or pass. The validation record is kept separately in `validation-status.md` and only reflects checks actually performed.
