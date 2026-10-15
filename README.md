# SauceDemo Playwright Automation Framework

A portfolio-ready end-to-end UI automation project built with **Playwright Test, TypeScript, Page Object Model (POM), JSON test data, environment profiles, a custom CLI runner, HTML reporting, and GitHub Actions**.

> **Target application:** [SauceDemo](https://www.saucedemo.com), a public training/demo storefront. The site has one shared hosted deployment; the `local`, `qa`, and `prod` profiles in this sample demonstrate configuration and safety policy, not three isolated SauceDemo servers. Replace each profile's `BASE_URL` when connecting the framework to your own deployments.

## What's included

- **15 automated UI cases** with stable IDs `TC-AUTO-001`–`TC-AUTO-015`.
- **20 manual cases** with IDs `TC-MAN-001`–`TC-MAN-020`.
- A traceable test case repository in `docs/test-cases.md` and `docs/test-case-repository.csv`.
- Page objects for Login, Inventory, Cart, and Checkout.
- Reusable fixtures, including an `authenticatedShopper` setup and a `checkoutReadyShopper` fixture that establishes the cart state required by checkout.
- Separate JSON data for users, products, and checkout details.
- `.env`, `.env.qa`, and `.env.prod` profile files.
- Custom CLI support for suite, case ID/test title, environment, browser project, headed/headless, and an explicit production-safety override.
- HTML report, list reporter, failure screenshots, retained-on-failure traces/videos, timestamped logs, and assertion messages.
- GitHub Actions on push, pull request, and manual dispatch; reports are uploaded as workflow artifacts even when tests fail.

## Prerequisites

- Node.js 22 (Node.js 20+ should work with compatible package releases).
- npm.
- Network access to install npm dependencies and Playwright's browser binaries.

## Install

From the project root:

```bash
npm install
npx playwright install chromium
```

To run other browser projects, install their browser binaries as well:

```bash
npx playwright install chromium firefox webkit
```

The browser download is separate from npm package installation. On Linux CI, use `npx playwright install --with-deps chromium` to install browser and system dependencies.

## Run tests with the custom command runner

Do not confuse the runner's `--env` option with Playwright's own options. The runner selects the environment profile, then launches Playwright Test with the correct project and filters.

### Run all 15 automated cases

```bash
npm test -- --suite all --env qa --browser chromium
```

The equivalent shortcuts are `npm run test:all` (default/local profile) and `npm run test:qa`.

### Run one automated test by its traceability ID

```bash
npm test -- --case TC-AUTO-004 --env qa --browser chromium
```

Filter by test-title text instead:

```bash
npm test -- --test-name "price from low to high" --env local
```

### Run one suite

```bash
npm test -- --suite auth --env qa
npm test -- --suite inventory --env qa
npm test -- --suite shopping --env qa
```

A specific file/path can be selected with `--path`:

```bash
npm test -- --path src/tests/ui/inventory.spec.ts --env qa
```

### Select environment and browser

```bash
npm test -- --suite all --env local --browser chromium
npm test -- --suite all --env qa --browser firefox
npm test -- --suite all --env qa --browser webkit
```

The runner's default browser is Chromium. `--project chromium|firefox|webkit` is an alias for `--browser`.

### Headed and headless runs

```bash
npm test -- --case TC-AUTO-001 --env qa --headed
npm test -- --case TC-AUTO-001 --env qa --headless
```

Headless is the default. `npm run test:headed` starts the full suite headed with the default environment profile.

### Production safety

The `prod` profile excludes checkout by default:

```bash
npm test -- --suite all --env prod
```

The checkout case `TC-AUTO-007` is tagged `@production-unsafe`. The custom runner selects the `prod` profile, and a fixture-level guard marks this case as skipped before it can execute unless the explicit override is supplied. Production-write approval should only be used after review and only when a test is designed for a non-destructive/approved production journey:

```bash
npm test -- --case TC-AUTO-007 --env prod --allow-production-writes
```

**Do not enable this override against a real production system without approval.** The demo site used here is shared and provides no isolated production tenant. The tag/guard is a safety demonstration, not a guarantee that arbitrary tests are safe for every application.

### Extra Playwright CLI options

Unrecognized Playwright flags are passed through, for example:

```bash
npm test -- --suite inventory --env qa --workers=1
```

Use `npm test -- --help` to see the runner options. `npm run typecheck` runs TypeScript's compiler in no-emit mode.

## Environment configuration

| Profile | File | Intended use | Safety behavior |
|---|---|---|---|
| `local` | `.env` | Default/local developer profile | Checkout test enabled |
| `qa` | `.env.qa` | QA validation | Checkout test enabled |
| `prod` | `.env.prod` | Read-only production smoke profile | Checkout excluded by default |

Select profiles using `--env local|qa|prod`, or set `TARGET_ENV=qa` / `ENV=qa` in the process environment. Environment settings include `BASE_URL`, `TEST_TIMEOUT_MS`, `EXPECT_TIMEOUT_MS`, `ACTION_TIMEOUT_MS`, `NAVIGATION_TIMEOUT_MS`, and `RETRIES`.

The `.env*` values in this sample intentionally point to SauceDemo's single public host. To use your own deployment, set the relevant `BASE_URL` values to that environment's base URL. Never commit real passwords, tokens, or production secrets. Use GitHub repository/environment secrets for sensitive values.

## Project architecture

```text
playwright-saucedemo-framework/
├── .github/workflows/playwright.yml   # CI on push, PR, manual dispatch
├── .env                               # Default/local configuration
├── .env.qa                            # QA configuration
├── .env.prod                          # Production safety profile
├── docs/
│   ├── research-notes.md              # Public repo/docs review and design choices
│   ├── test-cases.md                  # Human-readable traceability repository
│   ├── test-case-repository.csv       # All 35 cases in tabular form
│   └── validation-status.md           # Honest validation record
├── scripts/run-tests.mjs              # Custom runner / environment and browser selection
├── src/
│   ├── config/environment.ts          # Validates and loads environment profile
│   ├── data/                          # JSON test data, separate from test scripts
│   ├── fixtures/test.ts               # Page objects, auth/cart setup, prod guard
│   ├── pages/                         # Login, Inventory, Cart, Checkout POMs
│   ├── tests/ui/                      # Three test specs, 15 automated cases
│   └── utils/                         # Logger and reusable assertions
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### Design choices

- **POMs own selectors and reusable actions.** Tests own scenario assertions and business expectations.
- **Independent test execution.** Each case either uses its own page flow or a fixture that creates all state it needs. No case depends on a previous test having passed or having run first.
- **Explicit setup dependency.** `TC-AUTO-007` uses `checkoutReadyShopper`, which relies on `authenticatedShopper`, adds the backpack, and opens the cart before the test begins the checkout form. This demonstrates a dependent workflow without fragile cross-test ordering.
- **Parallel safety.** Playwright supplies an isolated browser context/page per test. The shared demo site can occasionally be slow or unavailable, but tests do not share browser storage or depend on execution order.
- **Typed test data.** Common credentials, product identity, and checkout data live in `src/data/*.json`; no production credentials are included.
- **Failure diagnostics.** Screenshots, traces and videos are retained on failure; successful runs do not retain video/trace artifacts unnecessarily.
- **Retries.** Local is configured with no retry by default. CI retries are enabled conservatively. Retries should not be used to conceal genuine instability.

## Automated test coverage

| ID | Scenario | Spec | Production profile |
|---|---|---|---|
| TC-AUTO-001 | Standard user sign-in | `authentication.spec.ts` | Included |
| TC-AUTO-002 | Locked-out user validation | `authentication.spec.ts` | Included |
| TC-AUTO-003 | Inventory contents | `inventory.spec.ts` | Included |
| TC-AUTO-004 | Price sort low-to-high | `inventory.spec.ts` | Included |
| TC-AUTO-005 | Add product and verify cart badge | `shopping.spec.ts` | Included |
| TC-AUTO-006 | Remove product from cart | `shopping.spec.ts` | Included |
| TC-AUTO-007 | Complete checkout journey | `shopping.spec.ts` | Excluded unless explicitly approved |
| TC-AUTO-008 | Invalid credentials display an error | `authentication.spec.ts` | Included |
| TC-AUTO-009 | Empty username validation | `authentication.spec.ts` | Included |
| TC-AUTO-010 | Empty password validation | `authentication.spec.ts` | Included |
| TC-AUTO-011 | Sort products by name A to Z | `inventory.spec.ts` | Included |
| TC-AUTO-012 | Sort products by name Z to A | `inventory.spec.ts` | Included |
| TC-AUTO-013 | Sort products by price high-to-low | `inventory.spec.ts` | Included |
| TC-AUTO-014 | Add multiple products and verify cart contents | `shopping.spec.ts` | Included |
| TC-AUTO-015 | Block checkout when postal code is missing | `shopping.spec.ts` | Included |

Manual cases include blank-field and invalid-credential validation, descending sorting, product detail navigation, continue-shopping behavior, checkout mandatory-field validation, and logout/session invalidation. Full instructions are in `docs/test-cases.md`.

## Reporting and debugging

After a run:

```bash
npm run report
```

Artifacts are generated in:

- `playwright-report/` — HTML report.
- `test-results/` — `results.json`, traces, failure screenshots, videos, and per-test results.

If the run fails, open the report first, then inspect the failed test's trace via Playwright Trace Viewer. Use `npx playwright show-trace path/to/trace.zip` where the path is shown by the test output/report. Avoid attaching credentials or sensitive payloads to issue trackers.

## GitHub Actions CI/CD

Workflow: `.github/workflows/playwright.yml`.

- Runs on pushes and pull requests to `main`/`master`, plus manual `workflow_dispatch`.
- Installs Node dependencies and Chromium system/browser dependencies.
- Calls the same custom runner for all 15 cases against the QA profile.
- Uploads the HTML report and test results as artifacts, even when tests fail.
- Supports selecting the environment through the `TARGET_ENV` repository variable and the base URL through `BASE_URL`. Configure GitHub repository variables as needed; secrets should only be used when the application under test requires credentials.

The sample uses public SauceDemo demo credentials stored in the test data JSON, so no GitHub secret is required for this demo target. If adapting the project to an authenticated internal app, remove secrets from JSON and inject them through GitHub secrets or environment variables.

## Troubleshooting

| Symptom | What to check |
|---|---|
| `browserType.launch: Executable doesn't exist` | Run `npx playwright install chromium` (or install the project browser). |
| Site navigation times out | Check your network, DNS, proxy, and the configured `BASE_URL`; SauceDemo is an external hosted demo. |
| Runner says unknown environment/suite/browser | Use `local`, `qa`, or `prod`; suite `all`, `auth`, `inventory`, or `shopping`; browser `chromium`, `firefox`, or `webkit`. |
| `TC-AUTO-007` is absent/skipped in production | This is intentional. Use the approved override only after a safety review. |
| TypeScript can't resolve a module | Run `npm install`, then `npm run typecheck`. |
| Flaky failure on shared demo site | Inspect trace and app availability. Do not immediately increase retries; first distinguish app/environment instability from an automation defect. |

## Research sources

This implementation uses these public references for design direction (see `docs/research-notes.md` for how each influenced the project):

- Playwright fixtures: https://playwright.dev/docs/test-fixtures
- Playwright Page Object Model: https://playwright.dev/docs/pom
- Playwright CI guidance: https://playwright.dev/docs/ci-intro
- Microsoft Playwright examples repository: https://github.com/microsoft/playwright-examples
- SauceDemo TypeScript/POM example repository reviewed for domain-specific workflow ideas: https://github.com/alanrychert/saucedemo-playwright-typescript

## License

This project is provided as an educational/portfolio sample. SauceDemo is an external service and remains subject to its own terms and availability.
