# Test Case Repository

**Application:** SauceDemo — https://www.saucedemo.com  
**Automated cases:** 7 (`TC-AUTO-001`–`TC-AUTO-007`)  
**Manual cases:** 8 (`TC-MAN-001`–`TC-MAN-008`)

The CSV companion (`test-case-repository.csv`) contains the same 15 cases in a spreadsheet-friendly format with one row per test case. New test cases should be added to both this document and the CSV so traceability remains consistent.

## Automated test cases

### TC-AUTO-001 — Standard user can sign in successfully

- **Preconditions:** SauceDemo is reachable; browser context is fresh.
- **Steps:** 1. Open the login page. 2. Enter `standard_user` and `secret_sauce`. 3. Select Login.
- **Test data:** `src/data/users.json` → `standard`.
- **Expected result:** Browser navigates to `/inventory.html`; Products heading and inventory cards are visible.
- **Priority:** P1 | **Type:** Functional / positive | **Automation:** Automated
- **Spec:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-002 — Locked-out user receives a clear authentication error

- **Preconditions:** SauceDemo is reachable; browser context is fresh.
- **Steps:** 1. Open login. 2. Enter `locked_out_user` and `secret_sauce`. 3. Select Login.
- **Test data:** `src/data/users.json` → `lockedOut`.
- **Expected result:** Login is rejected and a visible error explains that the user is locked out.
- **Priority:** P1 | **Type:** Functional / negative | **Automation:** Automated
- **Spec:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-003 — Inventory page renders expected products

- **Preconditions:** Valid standard demo user is available.
- **Steps:** 1. Log in via fixture setup. 2. Wait for the Products heading and inventory to render. 3. Read product names.
- **Test data:** `src/data/users.json`, `src/data/products.json`.
- **Expected result:** Six inventory products are rendered and Sauce Labs Backpack is present.
- **Priority:** P1 | **Type:** Functional / smoke | **Automation:** Automated
- **Spec:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-004 — Sort products by price from low to high

- **Preconditions:** Authenticated user is on Inventory.
- **Steps:** 1. Select price low-to-high. 2. Read displayed prices in document order. 3. Compare to a numerically sorted copy.
- **Test data:** Inventory catalog on SauceDemo; expected lowest-priced product in `src/data/products.json`.
- **Expected result:** Prices are in ascending order; Sauce Labs Onesie is first.
- **Priority:** P2 | **Type:** Functional / sorting | **Automation:** Automated
- **Spec:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-005 — Adding a product updates the cart badge

- **Preconditions:** Authenticated user is on Inventory with an empty session cart.
- **Steps:** 1. Add Sauce Labs Backpack. 2. Check the cart badge. 3. Check the product action changes to Remove.
- **Test data:** `src/data/products.json` → `backpack`.
- **Expected result:** Badge displays `1`; product action changes to Remove.
- **Priority:** P1 | **Type:** Functional / cart | **Automation:** Automated
- **Spec:** `src/tests/ui/shopping.spec.ts`

### TC-AUTO-006 — Product can be removed from the cart

- **Preconditions:** Authenticated user; product is added before opening Cart.
- **Steps:** 1. Add Sauce Labs Backpack. 2. Open Cart. 3. Select Remove for the backpack. 4. Check cart contents and badge.
- **Test data:** `src/data/products.json` → `backpack`.
- **Expected result:** Backpack is absent and the empty-cart badge is removed.
- **Priority:** P1 | **Type:** Functional / cart | **Automation:** Automated
- **Spec:** `src/tests/ui/shopping.spec.ts`

### TC-AUTO-007 — Complete checkout using a fixture-prepared cart

- **Preconditions:** Standard user can sign in; cart setup fixture can add Backpack.
- **Steps:** 1. Fixture authenticates and establishes a cart containing Backpack. 2. Open checkout. 3. Enter customer/shipping details. 4. Continue to overview. 5. Verify item and subtotal. 6. Finish order.
- **Test data:** `src/data/users.json`, `src/data/products.json`, `src/data/checkout.json`.
- **Expected result:** Checkout overview includes the expected product/subtotal and the completion page displays “Thank you for your order!”.
- **Priority:** P1 | **Type:** End-to-end / checkout | **Automation:** Automated; tagged `@production-unsafe`
- **Dependency:** Uses `checkoutReadyShopper` → `authenticatedShopper` fixture chain. Does not depend on another test running first.
- **Spec:** `src/tests/ui/shopping.spec.ts`

## Manual test cases

### TC-MAN-001 — Login validation for empty fields

- **Preconditions:** Browser is logged out and login page is open.
- **Steps:** 1. Leave username and password empty. 2. Click Login. 3. Observe the validation message.
- **Test data:** Username: blank; Password: blank.
- **Expected result:** Login is blocked and a required-username validation message is displayed.
- **Priority:** P1 | **Type:** Functional / negative | **Execution:** Manual only

### TC-MAN-002 — Invalid username and password are rejected

- **Preconditions:** Login page is open.
- **Steps:** 1. Enter `invalid_user`. 2. Enter `not_the_password`. 3. Click Login. 4. Verify the error and current URL.
- **Test data:** `src/data/users.json` → `invalid`.
- **Expected result:** Authentication fails, an invalid-credentials message is shown, and Inventory is not opened.
- **Priority:** P1 | **Type:** Functional / negative | **Execution:** Manual only

### TC-MAN-003 — Sort products by price from high to low

- **Preconditions:** Signed in as `standard_user`; Inventory is visible.
- **Steps:** 1. Open the sort dropdown. 2. Select Price (high to low). 3. Compare displayed prices from top to bottom.
- **Test data:** Inventory product list.
- **Expected result:** Prices display in descending numeric order and the highest-priced item is first.
- **Priority:** P2 | **Type:** Functional / sorting | **Execution:** Manual only

### TC-MAN-004 — Product details open from the inventory list

- **Preconditions:** Signed in; Inventory is visible.
- **Steps:** 1. Select the Sauce Labs Backpack product title or image. 2. Check the detail-page title, description, price, and action button. 3. Return to Inventory.
- **Test data:** Sauce Labs Backpack.
- **Expected result:** Product detail shows the correct product information and a usable add-to-cart action; return navigation works.
- **Priority:** P2 | **Type:** Functional / navigation | **Execution:** Manual only

### TC-MAN-005 — Continue shopping returns from Cart to Inventory

- **Preconditions:** Signed in; at least one product has been added to Cart.
- **Steps:** 1. Open Cart. 2. Select Continue Shopping. 3. Verify Inventory reappears. 4. Check the previously added product's cart state.
- **Test data:** Sauce Labs Backpack.
- **Expected result:** User returns to Inventory and the cart state remains intact.
- **Priority:** P2 | **Type:** Functional / navigation | **Execution:** Manual only

### TC-MAN-006 — Checkout requires a postal code

- **Preconditions:** Signed in; cart contains Sauce Labs Backpack; checkout information page is open.
- **Steps:** 1. Enter first and last name. 2. Leave Postal Code blank. 3. Select Continue. 4. Observe inline validation.
- **Test data:** First name `Alex`; last name `Tester`; postal code blank.
- **Expected result:** User cannot continue to the overview and a postal-code required message appears.
- **Priority:** P1 | **Type:** Functional / validation | **Execution:** Manual only

### TC-MAN-007 — Logout ends the authenticated session

- **Preconditions:** Signed in as `standard_user` and Inventory is visible.
- **Steps:** 1. Open the navigation menu. 2. Select Logout. 3. Verify login page. 4. Try directly navigating to `/inventory.html`.
- **Test data:** `standard_user` / `secret_sauce`.
- **Expected result:** User is returned to Login and protected Inventory content cannot be accessed while logged out.
- **Priority:** P1 | **Type:** Security / session management | **Execution:** Manual only

### TC-MAN-008 — Cart state remains consistent across navigation

- **Preconditions:** Signed in with an empty cart.
- **Steps:** 1. Add Sauce Labs Backpack and Sauce Labs Bike Light. 2. Open Cart and check both entries and the badge. 3. Continue shopping. 4. Return to Cart and verify both remain.
- **Test data:** Backpack and Bike Light.
- **Expected result:** Cart shows exactly two products, badge count remains two, and navigation does not discard the session cart.
- **Priority:** P2 | **Type:** Functional / state management | **Execution:** Manual only

## Execution and maintenance notes

- Automated cases are executable via the custom runner. Manual cases are documentation only and do not have associated `.spec.ts` implementations.
- CI runs all seven automated cases against the QA profile. Production profile excludes `TC-AUTO-007` by default.
- If selectors or public demo behavior change, update the POM and test case repository together.
