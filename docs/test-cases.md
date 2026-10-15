# Test Case Repository

**Application:** SauceDemo — https://www.saucedemo.com  
**Total cases:** 35  
**Automated cases:** 15 (`TC-AUTO-001`–`TC-AUTO-015`)  
**Manual / yet-to-automate cases:** 20 (`TC-MAN-001`–`TC-MAN-020`)  
**Functional areas:** Authentication, Inventory, Cart, Checkout, Navigation, Session, UI and Accessibility.

The CSV companion (`test-case-repository.csv`) mirrors all 35 cases in a spreadsheet-friendly format.

## Automated test cases

### TC-AUTO-001 — Standard user can sign in successfully

- **Preconditions:** SauceDemo is reachable; browser context is fresh.
- **Steps:** 1. Open the login page. 2. Enter standard_user and secret_sauce. 3. Select Login.
- **Test data:** src/data/users.json: standard
- **Expected result:** Browser navigates to /inventory.html; Products heading and inventory cards are visible.
- **Priority:** P1 | **Type:** Functional / positive | **Automation:** Automated
- **Reference:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-002 — Locked-out user receives a clear authentication error

- **Preconditions:** SauceDemo is reachable; browser context is fresh.
- **Steps:** 1. Open login. 2. Enter locked_out_user and secret_sauce. 3. Select Login.
- **Test data:** src/data/users.json: lockedOut
- **Expected result:** Login is rejected and a visible error explains that the user is locked out.
- **Priority:** P1 | **Type:** Functional / negative | **Automation:** Automated
- **Reference:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-003 — Inventory page renders the expected products

- **Preconditions:** The standard demo user is available.
- **Steps:** 1. Sign in using the authenticatedShopper fixture. 2. Wait for Products and inventory cards. 3. Read product names.
- **Test data:** src/data/users.json; src/data/products.json
- **Expected result:** Six inventory products are rendered and Sauce Labs Backpack is present.
- **Priority:** P1 | **Type:** Functional / smoke | **Automation:** Automated
- **Reference:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-004 — Products can be sorted by price from low to high

- **Preconditions:** Authenticated user is on Inventory.
- **Steps:** 1. Select Price (low to high). 2. Read displayed prices in order. 3. Verify ascending numerical order and lowest-priced product.
- **Test data:** Inventory catalog; src/data/products.json: lowestPriceProduct
- **Expected result:** Prices are ascending and Sauce Labs Onesie is first.
- **Priority:** P2 | **Type:** Functional / sorting | **Automation:** Automated
- **Reference:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-005 — Adding a product updates the cart badge

- **Preconditions:** Authenticated user is on Inventory with an empty cart.
- **Steps:** 1. Add Sauce Labs Backpack. 2. Check the cart badge. 3. Verify the product action changes to Remove.
- **Test data:** src/data/products.json: backpack
- **Expected result:** Badge displays 1 and the Backpack action changes to Remove.
- **Priority:** P1 | **Type:** Functional / cart | **Automation:** Automated
- **Reference:** `src/tests/ui/shopping.spec.ts`

### TC-AUTO-006 — A product can be removed from the cart

- **Preconditions:** Authenticated user can add a product.
- **Steps:** 1. Add Sauce Labs Backpack. 2. Open Cart. 3. Remove the Backpack. 4. Check cart contents and badge.
- **Test data:** src/data/products.json: backpack
- **Expected result:** Backpack is absent from Cart and the empty-cart badge is removed.
- **Priority:** P1 | **Type:** Functional / cart | **Automation:** Automated
- **Reference:** `src/tests/ui/shopping.spec.ts`

### TC-AUTO-007 — Shopper completes checkout for a cart prepared by a fixture

- **Preconditions:** The standard user can sign in; checkout fixture can establish a cart.
- **Steps:** 1. Fixture signs in and adds Backpack. 2. Open checkout. 3. Enter customer details. 4. Verify overview and subtotal. 5. Finish the order.
- **Test data:** src/data/users.json; src/data/products.json; src/data/checkout.json
- **Expected result:** Overview includes Backpack and $29.99 subtotal; completion page displays “Thank you for your order!”.
- **Priority:** P1 | **Type:** End-to-end / checkout | **Automation:** Automated; production-unsafe
- **Reference:** `src/tests/ui/shopping.spec.ts`
- **Dependency:** Uses `checkoutReadyShopper` → `authenticatedShopper` fixture chain. It does not depend on another test having run first.

### TC-AUTO-008 — Invalid username and password are rejected

- **Preconditions:** Login page is open.
- **Steps:** 1. Enter invalid_user and not_the_password. 2. Select Login. 3. Verify the error and URL.
- **Test data:** src/data/users.json: invalid
- **Expected result:** Generic invalid-credentials error is visible and Inventory is not opened.
- **Priority:** P1 | **Type:** Functional / negative | **Automation:** Automated
- **Reference:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-009 — Empty username displays required-field validation

- **Preconditions:** Login page is open.
- **Steps:** 1. Leave username blank. 2. Enter a valid password. 3. Select Login.
- **Test data:** src/data/users.json: emptyUsername
- **Expected result:** Login is blocked and “Username is required” is displayed.
- **Priority:** P1 | **Type:** Functional / validation | **Automation:** Automated
- **Reference:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-010 — Empty password displays required-field validation

- **Preconditions:** Login page is open.
- **Steps:** 1. Enter a valid username. 2. Leave password blank. 3. Select Login.
- **Test data:** src/data/users.json: emptyPassword
- **Expected result:** Login is blocked and “Password is required” is displayed.
- **Priority:** P1 | **Type:** Functional / validation | **Automation:** Automated
- **Reference:** `src/tests/ui/authentication.spec.ts`

### TC-AUTO-011 — Products can be sorted by name A to Z

- **Preconditions:** Authenticated user is on Inventory.
- **Steps:** 1. Select Name (A to Z). 2. Read displayed product names. 3. Compare to alphabetically ascending order.
- **Test data:** Inventory catalog
- **Expected result:** Displayed product names are in ascending alphabetical order.
- **Priority:** P2 | **Type:** Functional / sorting | **Automation:** Automated
- **Reference:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-012 — Products can be sorted by name Z to A

- **Preconditions:** Authenticated user is on Inventory.
- **Steps:** 1. Select Name (Z to A). 2. Read displayed product names. 3. Compare to alphabetically descending order.
- **Test data:** Inventory catalog
- **Expected result:** Displayed product names are in descending alphabetical order.
- **Priority:** P2 | **Type:** Functional / sorting | **Automation:** Automated
- **Reference:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-013 — Products can be sorted by price from high to low

- **Preconditions:** Authenticated user is on Inventory.
- **Steps:** 1. Select Price (high to low). 2. Read displayed prices. 3. Verify descending numerical order.
- **Test data:** Inventory catalog
- **Expected result:** Displayed prices are sorted in descending numerical order.
- **Priority:** P2 | **Type:** Functional / sorting | **Automation:** Automated
- **Reference:** `src/tests/ui/inventory.spec.ts`

### TC-AUTO-014 — Cart shows the correct contents when multiple products are added

- **Preconditions:** Authenticated user is on Inventory with an empty cart.
- **Steps:** 1. Add Sauce Labs Backpack. 2. Add Sauce Labs Bike Light. 3. Verify badge count. 4. Open Cart and verify both products and item count.
- **Test data:** src/data/products.json: backpack and bikeLight
- **Expected result:** Badge displays 2; Cart contains exactly Backpack and Bike Light.
- **Priority:** P1 | **Type:** Functional / cart | **Automation:** Automated
- **Reference:** `src/tests/ui/shopping.spec.ts`

### TC-AUTO-015 — Checkout blocks continuation when postal code is missing

- **Preconditions:** Authenticated user has Backpack in Cart and opens checkout information.
- **Steps:** 1. Leave postal code blank while entering first and last names. 2. Select Continue. 3. Check validation and URL.
- **Test data:** src/data/checkout.json: missingPostalCode
- **Expected result:** Postal Code is required is displayed and user remains on checkout-step-one.html.
- **Priority:** P1 | **Type:** Functional / checkout validation | **Automation:** Automated
- **Reference:** `src/tests/ui/shopping.spec.ts`

## Manual / yet-to-automate test cases

These 20 cases are documented for manual execution. They do not currently have executable Playwright test scripts.

### TC-MAN-001 — Submitting a completely empty login form displays validation

- **Preconditions:** User is logged out and login page is open.
- **Steps:** 1. Leave both username and password empty. 2. Click Login. 3. Observe the validation message.
- **Test data:** Username blank; password blank
- **Expected result:** Login is blocked and username-required validation appears.
- **Priority:** P1 | **Type:** Functional / negative | **Execution:** Manual only; not automated

### TC-MAN-002 — Product detail page presents the selected product information

- **Preconditions:** Standard user is signed in and Inventory is visible.
- **Steps:** 1. Open the Backpack details from its title. 2. Verify name, description, price and button. 3. Return to Inventory.
- **Test data:** Sauce Labs Backpack
- **Expected result:** Details correspond to Backpack, show a non-empty description and $29.99 price, and provide a working add/remove action.
- **Priority:** P2 | **Type:** Functional / product details | **Execution:** Manual only; not automated

### TC-MAN-003 — Continue Shopping returns to Inventory without losing cart item

- **Preconditions:** Standard user is signed in and one product is in Cart.
- **Steps:** 1. Open Cart. 2. Click Continue Shopping. 3. Verify Inventory. 4. Reopen Cart.
- **Test data:** Sauce Labs Backpack
- **Expected result:** User returns to Inventory and the existing cart item remains.
- **Priority:** P2 | **Type:** Functional / navigation | **Execution:** Manual only; not automated

### TC-MAN-004 — Logout prevents access to protected Inventory page

- **Preconditions:** User is signed in and Inventory is visible.
- **Steps:** 1. Open the side menu. 2. Click Logout. 3. Navigate directly to /inventory.html. 4. Verify protected content is not shown.
- **Test data:** standard_user / secret_sauce
- **Expected result:** User is logged out; direct navigation to Inventory redirects to or displays the login state.
- **Priority:** P1 | **Type:** Security / session management | **Execution:** Manual only; not automated

### TC-MAN-005 — Cart contents remain consistent across Inventory and Cart navigation

- **Preconditions:** User is signed in and cart starts empty.
- **Steps:** 1. Add Backpack and Bike Light. 2. Open Cart and record both entries. 3. Continue shopping. 4. Open Cart again.
- **Test data:** Backpack and Bike Light
- **Expected result:** Both products remain in Cart and count stays at two after navigation.
- **Priority:** P2 | **Type:** Functional / state management | **Execution:** Manual only; not automated

### TC-MAN-006 — Checkout requires a first name

- **Preconditions:** User is signed in, cart is non-empty and checkout information page is open.
- **Steps:** 1. Leave First Name blank. 2. Fill last name and postal code. 3. Click Continue.
- **Test data:** First name blank; last name Tester; postal code 500001
- **Expected result:** Checkout stays on the information page and displays a first-name-required error.
- **Priority:** P1 | **Type:** Functional / validation | **Execution:** Manual only; not automated

### TC-MAN-007 — Checkout requires a last name

- **Preconditions:** User is signed in, cart is non-empty and checkout information page is open.
- **Steps:** 1. Fill first name and postal code. 2. Leave Last Name blank. 3. Click Continue.
- **Test data:** First name Alex; last name blank; postal code 500001
- **Expected result:** Checkout stays on the information page and displays a last-name-required error.
- **Priority:** P1 | **Type:** Functional / validation | **Execution:** Manual only; not automated

### TC-MAN-008 — Cancel from checkout information returns to Cart

- **Preconditions:** User is signed in and has at least one cart item.
- **Steps:** 1. Open Cart. 2. Click Checkout. 3. Click Cancel on the information page. 4. Verify destination and cart item.
- **Test data:** Sauce Labs Backpack
- **Expected result:** User returns to Cart and previously added item remains.
- **Priority:** P2 | **Type:** Functional / checkout navigation | **Execution:** Manual only; not automated

### TC-MAN-009 — Cancel from checkout overview returns to shopping

- **Preconditions:** User has a product in Cart and valid customer details are entered.
- **Steps:** 1. Continue from checkout information to overview. 2. Click Cancel. 3. Verify destination and cart state.
- **Test data:** Backpack; Alex Tester; postal code 500001
- **Expected result:** Checkout is cancelled and user returns to Inventory without placing an order.
- **Priority:** P2 | **Type:** Functional / checkout navigation | **Execution:** Manual only; not automated

### TC-MAN-010 — Checkout subtotal, tax and total are calculated correctly

- **Preconditions:** User is signed in and can reach checkout overview with known products.
- **Steps:** 1. Add Backpack and Bike Light. 2. Complete customer information. 3. On overview, calculate subtotal and verify tax and total.
- **Test data:** Backpack $29.99; Bike Light $9.99; subtotal $39.98
- **Expected result:** Displayed subtotal is $39.98; displayed tax and total match the application's rounding and tax rules.
- **Priority:** P1 | **Type:** Functional / calculation | **Execution:** Manual only; not automated

### TC-MAN-011 — Back Home after order confirmation returns to Inventory

- **Preconditions:** A demo checkout has been completed.
- **Steps:** 1. On the confirmation page, click Back Home. 2. Verify Inventory. 3. Inspect the cart badge and product actions.
- **Test data:** Complete demo order with Backpack
- **Expected result:** User returns to Inventory and completed cart state is cleared.
- **Priority:** P2 | **Type:** Functional / post-checkout navigation | **Execution:** Manual only; not automated

### TC-MAN-012 — Side-menu All Items navigates to Inventory

- **Preconditions:** User is signed in and any non-checkout page is open.
- **Steps:** 1. Open the side menu. 2. Select All Items. 3. Verify URL and Products heading.
- **Test data:** standard_user / secret_sauce
- **Expected result:** Inventory is displayed and user can continue shopping.
- **Priority:** P2 | **Type:** Functional / navigation | **Execution:** Manual only; not automated

### TC-MAN-013 — About menu opens the expected external destination

- **Preconditions:** User is signed in and the side menu is available.
- **Steps:** 1. Open the side menu. 2. Select About. 3. Verify the destination opened and page loads.
- **Test data:** About menu option
- **Expected result:** A Sauce Labs destination opens successfully; no broken or unexpected internal page is shown.
- **Priority:** P3 | **Type:** Functional / external navigation | **Execution:** Manual only; not automated

### TC-MAN-014 — Reset App State clears cart state on Inventory

- **Preconditions:** User is signed in and at least one product has been added.
- **Steps:** 1. Open the side menu. 2. Select Reset App State. 3. Close menu. 4. Check cart badge and affected product button.
- **Test data:** Backpack added to Cart
- **Expected result:** Cart badge is cleared and product action returns to Add to cart.
- **Priority:** P2 | **Type:** Functional / state reset | **Execution:** Manual only; not automated

### TC-MAN-015 — Browser Back from product details returns to the catalog

- **Preconditions:** User is signed in and Inventory is visible.
- **Steps:** 1. Open a product detail page. 2. Use browser Back. 3. Verify Inventory list and sort control.
- **Test data:** Sauce Labs Backpack
- **Expected result:** Inventory returns with product cards visible and navigation remains usable.
- **Priority:** P3 | **Type:** Functional / browser navigation | **Execution:** Manual only; not automated

### TC-MAN-016 — All inventory product images render successfully

- **Preconditions:** User is signed in and Inventory is loaded.
- **Steps:** 1. Inspect each product card image. 2. Verify each image is visible and not broken. 3. Check image content corresponds to the product.
- **Test data:** All six inventory products
- **Expected result:** Every product card image renders without broken-image placeholders.
- **Priority:** P2 | **Type:** UI / asset validation | **Execution:** Manual only; not automated

### TC-MAN-017 — Product data matches between catalog and detail page

- **Preconditions:** User is signed in and Inventory is visible.
- **Steps:** 1. Record a product name, description and price from the catalog. 2. Open its detail page. 3. Compare displayed information.
- **Test data:** Sauce Labs Backpack and one other product
- **Expected result:** Name and price match between pages; description is present and belongs to the selected product.
- **Priority:** P2 | **Type:** Functional / data consistency | **Execution:** Manual only; not automated

### TC-MAN-018 — Keyboard navigation follows a usable focus order

- **Preconditions:** Login page is open, then repeat the check on Inventory.
- **Steps:** 1. Use Tab and Shift+Tab without a mouse. 2. Observe focus order and visible focus indicators. 3. Activate Login or a product action using the keyboard.
- **Test data:** Keyboard only; standard_user / secret_sauce
- **Expected result:** Focusable controls follow a logical order, focus is visible and key actions can be activated.
- **Priority:** P2 | **Type:** Accessibility / keyboard | **Execution:** Manual only; not automated

### TC-MAN-019 — Responsive layout remains usable at a mobile viewport

- **Preconditions:** Browser viewport can be set to a common mobile size.
- **Steps:** 1. Set viewport to 390x844. 2. Open Login and sign in. 3. Inspect Inventory, Cart and Checkout. 4. Look for horizontal overflow or overlapping controls.
- **Test data:** Viewport 390x844; standard user
- **Expected result:** Primary actions and text remain visible and usable without unintended horizontal scrolling or overlap.
- **Priority:** P3 | **Type:** UI / responsive | **Execution:** Manual only; not automated

### TC-MAN-020 — Refreshing Inventory preserves authenticated navigation and cart state

- **Preconditions:** User is signed in and one product is in Cart.
- **Steps:** 1. Add Backpack. 2. Refresh the Inventory page. 3. Verify the authenticated page loads. 4. Open Cart and inspect the item.
- **Test data:** Sauce Labs Backpack; standard_user
- **Expected result:** Page refresh does not leave a broken route; expected signed-in and cart behavior is observed and documented.
- **Priority:** P2 | **Type:** Functional / session state | **Execution:** Manual only; not automated

## Coverage and execution notes

- The automated suite currently contains 15 executable test scenarios distributed across authentication, inventory, and shopping specs.
- The manual backlog contains 20 distinct scenarios covering further checkout validation, navigation, product details, state-reset, accessibility, and responsive behavior.
- This is a curated regression scope, not a claim that every possible behavior of SauceDemo is covered.
- Each automated test can run independently. `TC-AUTO-007` uses fixtures to establish authenticated/cart state instead of relying on a preceding test.
- CI executes the full 15-test automated suite on pushes and pull requests for configured branches.
