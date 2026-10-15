# SauceDemo Test Case Repository

## Scope and review outcome

- **Application under test:** https://www.saucedemo.com
- **Total cases:** 35 (15 automated, 20 manual)
- **Test account:** `standard_user` / `secret_sauce`
- **Catalog baseline:** six products; prices and default order are recorded in the individual cases.

The test cases were reviewed against the live SauceDemo application on 2026-10-15. The live UI confirmed the login validation, six-product inventory, product detail page, cart badge, checkout validation, and checkout totals recorded below. The public site is a shared training storefront, not an isolated QA environment.

The review tightened setup, steps, and observable pass criteria; corrected checkout cancellation and logout/back-navigation expectations; and removed test-order dependence from the automated shopping cases. Automated cases use a fresh Playwright context and should be runnable individually. Manual cases require a fresh browser session or the stated reset step. Do not record a result as passed unless the case was actually executed.

## Automated test cases

### TC-AUTO-001 — Sign in with valid credentials

- **Priority / type / status:** P1 / Functional - Positive / Automated
- **Preconditions:** Login page is available; start in a fresh, logged-out browser context.
- **Test data:** `standard_user` / `secret_sauce`.
- **Steps:**
  1. Open `https://www.saucedemo.com`.
  2. Enter the username and password above and select **Login**.
  3. Wait for the Inventory page to finish loading.
- **Expected results:**
  1. The URL ends in `/inventory.html`.
  2. The **Products** heading and all six product cards are visible.
  3. The cart badge is absent because no products have been added.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-002 — Reject a locked-out user

- **Priority / type / status:** P1 / Functional - Negative / Automated
- **Preconditions:** Login page is available; user is logged out.
- **Test data:** `locked_out_user` / `secret_sauce`.
- **Steps:** Open the login page, submit the supplied credentials, and inspect the validation response.
- **Expected results:** The user remains on the login page; the visible error states `Sorry, this user has been locked out.`; Inventory is not displayed.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-003 — Verify the default inventory catalogue

- **Priority / type / status:** P1 / Functional - Inventory / Automated
- **Preconditions:** Start in a fresh, logged-out browser context.
- **Test data:** `standard_user` / `secret_sauce`; expected product names and prices:
  - Sauce Labs Backpack — $29.99
  - Sauce Labs Bike Light — $9.99
  - Sauce Labs Bolt T-Shirt — $15.99
  - Sauce Labs Fleece Jacket — $49.99
  - Sauce Labs Onesie — $7.99
  - Test.allTheThings() T-Shirt (Red) — $15.99
- **Steps:** Sign in; wait for Inventory; compare the complete displayed product names and prices with the test data.
- **Expected results:** The page shows exactly six products in the default A-to-Z order above; every listed price matches; the cart is empty.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-004 — Sort products by price, low to high

- **Priority / type / status:** P2 / Functional - Sorting / Automated
- **Preconditions:** Start with an empty cart and a standard-user session on Inventory.
- **Test data:** Sort option **Price (low to high)**; six products in the catalogue.
- **Steps:** Select the sort option; read all displayed prices from top to bottom; inspect the first and last product names.
- **Expected results:** Exactly six products remain; prices are non-decreasing; Sauce Labs Onesie ($7.99) is first and Sauce Labs Fleece Jacket ($49.99) is last.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-005 — Add one product to the cart

- **Priority / type / status:** P1 / Functional - Cart / Automated
- **Preconditions:** Start in a fresh browser context; the authenticated-shopper fixture signs in and verifies an empty cart.
- **Test data:** Sauce Labs Backpack — $29.99; product key `sauce-labs-backpack`.
- **Steps:** Add the backpack from Inventory; inspect its action button and the cart badge.
- **Expected results:** The button changes to **Remove**; the cart badge displays `1`.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-006 — Remove one product while retaining another

- **Priority / type / status:** P1 / Functional - Cart / Automated
- **Preconditions:** Start in a fresh browser context; the checkout-ready fixture signs in and places Sauce Labs Backpack in the cart.
- **Test data:** Sauce Labs Backpack — $29.99; Sauce Labs Bike Light — $9.99.
- **Steps:**
  1. From Cart, select **Continue Shopping**.
  2. Add Sauce Labs Bike Light and open Cart.
  3. Remove Sauce Labs Backpack.
  4. Inspect cart rows and the cart badge.
- **Expected results:** Exactly one cart row remains, for Sauce Labs Bike Light at $9.99; the backpack is absent; the badge displays `1`.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-007 — Complete checkout successfully

- **Priority / type / status:** P1 / End-to-end - Positive / Automated; tagged `@production-unsafe` and skipped in the `prod` profile unless explicitly approved.
- **Preconditions:** Start in a fresh browser context; the checkout-ready fixture signs in and places Sauce Labs Backpack in the cart. This test completes a demo order and must not run against a real production storefront without approval.
- **Test data:** Backpack — $29.99; first name `Alex`; last name `Tester`; postal code `500001`.
- **Steps:**
  1. Open Checkout from Cart.
  2. Enter all three customer fields and select **Continue**.
  3. Review the item and displayed cost breakdown.
  4. Select **Finish**.
- **Expected results:** The overview contains one Sauce Labs Backpack; item total is $29.99, tax is $2.40, and total is $32.39; finishing checkout navigates to `/checkout-complete.html` and displays **Thank you for your order!**
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-008 — Reject unrecognized credentials

- **Priority / type / status:** P1 / Functional - Negative / Automated
- **Preconditions:** Login page is available; user is logged out.
- **Test data:** Username `invalid_user`; password `not_the_password`.
- **Steps:** Open the login page, submit the supplied credentials, and inspect the response.
- **Expected results:** The login page remains visible; the error says `Username and password do not match any user in this service`; Inventory is not opened.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-009 — Require a username

- **Priority / type / status:** P1 / Validation - Negative / Automated
- **Preconditions:** Login page is available; user is logged out.
- **Test data:** Username empty; password `secret_sauce`.
- **Steps:** Open the login page; leave Username empty; enter the password; select **Login**.
- **Expected results:** The login form remains available; the error says `Username is required`; Inventory is not opened.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-010 — Require a password

- **Priority / type / status:** P1 / Validation - Negative / Automated
- **Preconditions:** Login page is available; user is logged out.
- **Test data:** Username `standard_user`; password empty.
- **Steps:** Open the login page; enter the username; leave Password empty; select **Login**.
- **Expected results:** The login form remains available; the error says `Password is required`; Inventory is not opened.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-011 — Sort products by name, A to Z

- **Priority / type / status:** P2 / Functional - Sorting / Automated
- **Preconditions:** Start with an empty cart and a standard-user session on Inventory.
- **Test data:** Sort option **Name (A to Z)**; all six catalogue products.
- **Steps:** Select **Name (A to Z)**; collect every product name in rendered order.
- **Expected results:** The exact order is Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red); no product is missing or duplicated.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-012 — Sort products by name, Z to A

- **Priority / type / status:** P2 / Functional - Sorting / Automated
- **Preconditions:** Start with an empty cart and a standard-user session on Inventory.
- **Test data:** Sort option **Name (Z to A)**; all six catalogue products.
- **Steps:** Select **Name (Z to A)**; collect every product name in rendered order.
- **Expected results:** The exact reverse alphabetical order is Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack; no product is missing or duplicated.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-013 — Sort products by price, high to low

- **Priority / type / status:** P2 / Functional - Sorting / Automated
- **Preconditions:** Start with an empty cart and a standard-user session on Inventory.
- **Test data:** Sort option **Price (high to low)**; six products in the catalogue.
- **Steps:** Select the sort option; read all displayed prices from top to bottom; inspect the first and last product names.
- **Expected results:** Exactly six products remain; prices are non-increasing; Sauce Labs Fleece Jacket ($49.99) is first and Sauce Labs Onesie ($7.99) is last.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-014 — Verify multiple products in the cart

- **Priority / type / status:** P1 / Functional - Cart / Automated
- **Preconditions:** Start in a fresh browser context; the checkout-ready fixture signs in and places Sauce Labs Backpack in the cart.
- **Test data:** Sauce Labs Backpack — $29.99; Sauce Labs Bike Light — $9.99.
- **Steps:** Continue shopping; add Sauce Labs Bike Light; open Cart; inspect all rows, names, prices, and the badge.
- **Expected results:** Exactly two rows appear—Backpack ($29.99) and Bike Light ($9.99)—and the cart badge displays `2`.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

### TC-AUTO-015 — Require a postal code at checkout

- **Priority / type / status:** P1 / Validation - Negative / Automated
- **Preconditions:** Start in a fresh browser context; the checkout-ready fixture signs in and places Sauce Labs Backpack in the cart.
- **Test data:** First name `Alex`; last name `Tester`; postal code empty.
- **Steps:** Open Checkout; enter first and last name; leave Zip/Postal Code empty; select **Continue**.
- **Expected results:** The error says `Postal Code is required`; the URL remains `/checkout-step-one.html`; the overview is not displayed.
- **Actual result:** Passed in full-suite run 2026-10-15 (15/15; qa profile, Chromium; 2 workers).

## Manual test cases

### TC-MAN-001 — Submit login with both fields empty

- **Priority / type / status:** P1 / Validation - Negative / Manual
- **Preconditions:** Open the login page in a logged-out session.
- **Test data:** Username empty; password empty.
- **Steps:** Leave both fields blank; select **Login**.
- **Expected results:** Login is blocked; `Username is required` is shown; the user remains on the login page.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-002 — Submit login with username only

- **Priority / type / status:** P1 / Validation - Negative / Manual
- **Preconditions:** Open the login page in a logged-out session.
- **Test data:** Username `standard_user`; password empty.
- **Steps:** Enter the username; leave Password blank; select **Login**.
- **Expected results:** Login is blocked; `Password is required` is shown; the user remains on the login page.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-003 — Submit login with password only

- **Priority / type / status:** P1 / Validation - Negative / Manual
- **Preconditions:** Open the login page in a logged-out session.
- **Test data:** Username empty; password `secret_sauce`.
- **Steps:** Leave Username blank; enter the password; select **Login**.
- **Expected results:** Login is blocked; `Username is required` is shown; the user remains on the login page.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-004 — Log out and verify the session ends

- **Priority / type / status:** P1 / Security - Session / Manual
- **Preconditions:** Sign in as `standard_user` / `secret_sauce`.
- **Test data:** SauceDemo standard account.
- **Steps:** Open the menu; select **Logout**; inspect the destination and login form; try opening `/inventory.html` directly.
- **Expected results:** The login page is displayed, credentials are not prefilled, and direct access to Inventory is blocked until the user signs in again.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-005 — Block browser Back access after logout

- **Priority / type / status:** P1 / Security - Session / Manual
- **Preconditions:** Sign in as standard user, then log out using the menu.
- **Test data:** `standard_user` / `secret_sauce`.
- **Steps:** From the login page, press browser **Back** once; inspect the page and attempt to use Inventory controls if any are rendered.
- **Expected results:** Protected Inventory is not usable; the user remains on the login page or is returned to it with a login-required message. On the current site, the message is `You can only access '/inventory.html' when you are logged in.`
- **Actual result:** Not executed manually; live browser inspection on 2026-10-15 confirmed this expected block.

### TC-MAN-006 — Open and inspect a product detail page

- **Priority / type / status:** P2 / Functional - Product details / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** Sauce Labs Backpack.
- **Steps:** Select the backpack name or image; inspect the detail page; select **Back to products**.
- **Expected results:** The detail page shows the backpack name, description, $29.99 price, product image with matching alternative text, and **Add to cart** button; Back to products returns to Inventory.
- **Actual result:** Not executed manually; live browser inspection on 2026-10-15 confirmed the detail page content.

### TC-MAN-007 — Compare inventory and product detail data

- **Priority / type / status:** P2 / Data consistency / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** Sauce Labs Backpack; expected price $29.99.
- **Steps:** Record the backpack name, description, and price on Inventory; open its detail page; compare each value.
- **Expected results:** Name, description, and price match exactly between Inventory and the detail page; the product image corresponds to the backpack.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-008 — Manually verify name sort A to Z

- **Priority / type / status:** P2 / Functional - Sorting / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** **Name (A to Z)**; six catalogue products.
- **Steps:** Select the sort option; inspect all six names from first to last.
- **Expected results:** Names appear exactly in the order recorded in TC-AUTO-011; all six are present once.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-009 — Manually verify name sort Z to A

- **Priority / type / status:** P2 / Functional - Sorting / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** **Name (Z to A)**; six catalogue products.
- **Steps:** Select the sort option; inspect all six names from first to last.
- **Expected results:** Names appear exactly in the order recorded in TC-AUTO-012; all six are present once.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-010 — Manually verify price sort low to high

- **Priority / type / status:** P2 / Functional - Sorting / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** **Price (low to high)**; six catalogue products.
- **Steps:** Select the sort option; inspect every product and price from first to last.
- **Expected results:** Prices are non-decreasing; Onesie ($7.99) is first and Fleece Jacket ($49.99) last; all six products remain visible.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-011 — Manually verify price sort high to low

- **Priority / type / status:** P2 / Functional - Sorting / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** **Price (high to low)**; six catalogue products.
- **Steps:** Select the sort option; inspect every product and price from first to last.
- **Expected results:** Prices are non-increasing; Fleece Jacket ($49.99) is first and Onesie ($7.99) last; all six products remain visible.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-012 — Remove one product from a multi-product cart

- **Priority / type / status:** P1 / Functional - Cart / Manual
- **Preconditions:** Sign in as standard user; start with an empty cart.
- **Test data:** Backpack ($29.99) and Bike Light ($9.99).
- **Steps:** Add both products; open Cart; remove Backpack; inspect rows and badge.
- **Expected results:** Only Bike Light ($9.99) remains; the Backpack is absent; the badge displays `1`.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-013 — Continue shopping without losing the cart

- **Priority / type / status:** P2 / Navigation - Cart / Manual
- **Preconditions:** Sign in as standard user; start with an empty cart.
- **Test data:** Sauce Labs Backpack.
- **Steps:** Add Backpack; open Cart; select **Continue Shopping**; inspect Inventory and cart state.
- **Expected results:** Inventory is displayed; Backpack's action is **Remove**; cart badge remains `1`.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-014 — Cancel checkout from the overview and retain the cart

- **Priority / type / status:** P2 / Functional - Checkout / Manual
- **Preconditions:** Sign in as standard user; place Backpack in Cart.
- **Test data:** Backpack; first name `Alex`; last name `Tester`; postal code `500001`.
- **Steps:** Open Cart and Checkout; enter valid customer details; continue to **Checkout: Overview**; select **Cancel**; verify Inventory; reopen Cart.
- **Expected results:** Checkout is cancelled and Inventory is displayed; no order is submitted; Backpack remains in the cart and the badge remains `1`. The current site returns to Inventory on cancellation, not directly to Cart.
- **Actual result:** Not executed manually; live browser inspection on 2026-10-15 confirmed overview cancellation returns to Inventory with the cart intact.

### TC-MAN-015 — Reject checkout when first name is missing

- **Priority / type / status:** P1 / Validation - Negative / Manual
- **Preconditions:** Sign in as standard user; place Backpack in Cart.
- **Test data:** First name empty; last name `Tester`; postal code `500001`.
- **Steps:** Open Cart and Checkout; leave First Name blank; fill the other two fields; select **Continue**.
- **Expected results:** `First Name is required` is shown; the URL remains `/checkout-step-one.html`; the overview is not displayed.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-016 — Reject checkout when last name is missing

- **Priority / type / status:** P1 / Validation - Negative / Manual
- **Preconditions:** Sign in as standard user; place Backpack in Cart.
- **Test data:** First name `Alex`; last name empty; postal code `500001`.
- **Steps:** Open Cart and Checkout; enter first name; leave Last Name blank; enter postal code; select **Continue**.
- **Expected results:** `Last Name is required` is shown; the URL remains `/checkout-step-one.html`; the overview is not displayed.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-017 — Verify order overview amounts

- **Priority / type / status:** P1 / Financial calculation - UI / Manual
- **Preconditions:** Sign in as standard user; start with an empty cart.
- **Test data:** Backpack ($29.99); first name `Alex`; last name `Tester`; postal code `500001`.
- **Steps:** Add Backpack; open Cart and Checkout; enter customer details; continue to the overview; compare item, tax, and total amounts.
- **Expected results:** Exactly one Backpack appears; item total is $29.99; tax is $2.40; total is $32.39 (item total plus tax); shipping is displayed as free.
- **Actual result:** Not executed manually; live browser inspection on 2026-10-15 confirmed $29.99 + $2.40 = $32.39 for this product.

### TC-MAN-018 — Verify checkout completion confirmation

- **Priority / type / status:** P1 / End-to-end - Positive / Manual; perform only on the SauceDemo training storefront or an approved test environment.
- **Preconditions:** Sign in as standard user; place Backpack in Cart; customer details are available.
- **Test data:** Backpack; first name `Alex`; last name `Tester`; postal code `500001`.
- **Steps:** Complete customer information; verify the overview and total; select **Finish**; inspect the confirmation page; select **Back Home**.
- **Expected results:** `/checkout-complete.html` displays **Thank you for your order!** and the dispatch confirmation; **Back Home** returns to Inventory; the completed order is not presented as an active cart item.
- **Actual result:** Not executed manually; record the observed result when run.

### TC-MAN-019 — Verify navigation menu options and key actions

- **Priority / type / status:** P3 / Navigation / Manual
- **Preconditions:** Sign in as standard user; Inventory is displayed.
- **Test data:** Menu actions: All Items, Dynamic Catalog, About, Logout, Reset App State.
- **Steps:** Open the menu and verify the five listed options; close it; add Backpack and open the menu again; select **Reset App State**; verify the badge disappears and the product can be added again; verify the About link target without leaving the site; select **Logout**.
- **Expected results:** The menu opens and closes; the five current options are present; Reset App State clears the cart; About links to `https://saucelabs.com/`; Logout returns to the login page. Do not follow the external About link unless that is in scope.
- **Actual result:** Not executed manually; live browser inspection on 2026-10-15 confirmed the five menu entries.

### TC-MAN-020 — Verify the cart is empty for a new session

- **Priority / type / status:** P2 / Functional - Cart / Manual
- **Preconditions:** Use a fresh private browser context or select **Reset App State** before starting; sign in as standard user.
- **Test data:** No products added.
- **Steps:** Confirm no cart badge is shown; open Cart; inspect its contents and available actions.
- **Expected results:** Cart contains zero product rows and no positive count badge; **Continue Shopping** and **Checkout** are available; no prior session's cart item is present.
- **Actual result:** Not executed manually; record the observed result when run.

## Execution and maintenance notes

- Keep automated cases independent; do not depend on test order or state shared between tests.
- Update the automated **Actual result** only from the corresponding test run. Manual cases remain not executed until someone performs them.
- Reconfirm catalog prices, checkout tax, and menu content if SauceDemo changes; these are observations of the current public demo, not a contract for every deployment.
- TC-MAN-008–011 intentionally provide hands-on visual spot checks of sorting already covered by automated cases. If manual effort is limited, prioritize the non-duplicated flows and retain automated sorting as the regression oracle.
