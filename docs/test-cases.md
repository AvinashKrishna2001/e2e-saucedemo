# SauceDemo Test Case Repository

## Scope

- **Total test cases:** 35
- **Automated:** 15
- **Manual / yet to automate:** 20
- **Application under test:** https://www.saucedemo.com

Each test case is self-contained: preconditions, steps, test data, expected results, actual result, priority, test type, and automation status are included. Test data is written directly in each case; no other file needs to be opened to understand or execute a case.

**Actual-result policy:** Automated actual-result notes reflect only the execution context described in the project conversation and should be reconfirmed against the current commit. Manual cases are marked not executed so no result is fabricated. Update the Actual Result field after each real execution.

## Automated test cases (15)

### TC-AUTO-001 — Login with valid credentials

- **Preconditions:** Login page is accessible; user is logged out.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Open the URL. 2. Enter standard_user. 3. Enter secret_sauce. 4. Click Login.
- **Expected Results:** User is redirected to Inventory; Products heading and product cards are visible.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-002 — Locked-out user cannot log in

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: locked_out_user; Password: secret_sauce
- **Test Steps:**
  1. Open the URL. 2. Enter locked_out_user. 3. Enter secret_sauce. 4. Click Login.
- **Expected Results:** Login is blocked and an error explains that the user is locked out.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Negative
- **Automation Status:** Automated

### TC-AUTO-003 — Inventory displays products for a standard user

- **Preconditions:** A valid standard-user login can be performed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Log in. 2. Wait for Inventory. 3. Inspect the Products heading and product cards.
- **Expected Results:** Inventory loads and the expected product listing is displayed.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-004 — Products can be sorted by price from low to high

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Price (low to high)
- **Test Steps:**
  1. Log in. 2. Select Price (low to high). 3. Read displayed product prices in order. 4. Verify each price is less than or equal to the next.
- **Expected Results:** Products are ordered by ascending price.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-005 — Add a product to the cart

- **Preconditions:** None. First test in the dependent shopping chain; it logs in itself.
- **Dependencies:** None. TC-AUTO-014, 006, 015 and 007 depend on this test.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; Price: $29.99
- **Test Steps:**
  1. Log in. 2. Add Sauce Labs Backpack. 3. Check the cart badge.
- **Expected Results:** Cart badge displays 1 and the selected product is added.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-006 — Remove a product from the cart

- **Preconditions:** TC-AUTO-014 has run: the user is logged in and the Cart page shows the backpack and the bike light.
- **Dependencies:** TC-AUTO-014 (fails if run alone).
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Test Steps:**
  1. Remove Sauce Labs Backpack from the cart. 2. Check the cart badge and cart contents.
- **Expected Results:** Backpack is removed, Sauce Labs Bike Light remains and the cart badge shows 1.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Negative/State change
- **Automation Status:** Automated

### TC-AUTO-007 — Complete checkout successfully

- **Preconditions:** TC-AUTO-015 has run: the user is logged in, the cart holds the Sauce Labs Bike Light and checkout step one is open.
- **Dependencies:** TC-AUTO-015 (fails if run alone). Tagged `@production-unsafe`; skipped in `prod`.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Bike Light ($9.99); First name: Alex; Last name: Tester; Postal code: 500001
- **Test Steps:**
  1. Enter first name, last name and postal code. 2. Continue. 3. Verify overview and item total. 4. Finish checkout.
- **Expected Results:** Order confirmation is displayed and indicates that the order is complete.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** End-to-end - Positive
- **Automation Status:** Automated

### TC-AUTO-008 — Invalid credentials display an error

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: invalid_user; Password: wrong_password
- **Test Steps:**
  1. Open the URL. 2. Enter invalid_user. 3. Enter wrong_password. 4. Click Login.
- **Expected Results:** Login is blocked and a clear authentication error is displayed.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Negative
- **Automation Status:** Automated

### TC-AUTO-009 — Empty username displays required-field validation

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: empty; Password: secret_sauce
- **Test Steps:**
  1. Open the URL. 2. Leave Username empty. 3. Enter secret_sauce in Password. 4. Click Login.
- **Expected Results:** Login is blocked and a username-required validation message is displayed.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

### TC-AUTO-010 — Empty password displays required-field validation

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: empty
- **Test Steps:**
  1. Open the URL. 2. Enter standard_user. 3. Leave Password empty. 4. Click Login.
- **Expected Results:** Login is blocked and a password-required validation message is displayed.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

### TC-AUTO-011 — Product sorting by name A to Z

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Name (A to Z)
- **Test Steps:**
  1. Log in. 2. Select Name (A to Z). 3. Read product names in display order.
- **Expected Results:** Product names appear in ascending alphabetical order.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-012 — Product sorting by name Z to A

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Name (Z to A)
- **Test Steps:**
  1. Log in. 2. Select Name (Z to A). 3. Read product names in display order.
- **Expected Results:** Product names appear in descending alphabetical order.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-013 — Products can be sorted by price from high to low

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Price (high to low)
- **Test Steps:**
  1. Log in. 2. Select Price (high to low). 3. Read displayed product prices in order. 4. Verify each price is greater than or equal to the next.
- **Expected Results:** Products are ordered by descending price.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-014 — Cart shows the correct contents when multiple products are added

- **Preconditions:** TC-AUTO-005 has run: the user is logged in and the cart already holds the backpack.
- **Dependencies:** TC-AUTO-005 (fails if run alone).
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Products: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99)
- **Test Steps:**
  1. Add Sauce Labs Bike Light. 2. Open Cart. 3. Verify both product names and item count.
- **Expected Results:** Cart contains exactly two items: Sauce Labs Backpack and Sauce Labs Bike Light.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Functional - Cart
- **Automation Status:** Automated

### TC-AUTO-015 — Checkout blocks continuation when postal code is missing

- **Preconditions:** TC-AUTO-006 has run: the user is logged in and the Cart page shows the Sauce Labs Bike Light.
- **Dependencies:** TC-AUTO-006 (fails if run alone).
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Bike Light; First name: Alex; Last name: Tester; Postal code: empty
- **Test Steps:**
  1. Click Checkout. 2. Enter first and last name. 3. Leave Postal Code empty. 4. Click Continue.
- **Expected Results:** Checkout does not proceed to the overview and a postal-code-required message is displayed.
- **Actual Result:** Passed on 2026-10-15 in a full-suite run (15/15 passed; local profile, Chromium).
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

## Manual test cases (20)

### TC-MAN-001 — Submit login form with both fields empty

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: empty; Password: empty
- **Test Steps:**
  1. Open the URL. 2. Leave both fields empty. 3. Click Login. 4. Read the error message.
- **Expected Results:** Login is blocked and the username-required message is displayed.
- **Actual Result:** Not executed manually; record the observed message after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-002 — Submit login form with username only

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: empty
- **Test Steps:**
  1. Open the URL. 2. Enter standard_user. 3. Leave Password empty. 4. Click Login.
- **Expected Results:** Login is blocked and the password-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-003 — Submit login form with password only

- **Preconditions:** Login page is accessible.
- **Test Data:** URL: https://www.saucedemo.com; Username: empty; Password: secret_sauce
- **Test Steps:**
  1. Open the URL. 2. Leave Username empty. 3. Enter secret_sauce. 4. Click Login.
- **Expected Results:** Login is blocked and the username-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-004 — Verify logout ends the user session

- **Preconditions:** User is logged in as standard_user.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Log in. 2. Open the navigation menu. 3. Click Logout. 4. Verify the login page is shown.
- **Expected Results:** User is logged out and the login form is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Security - Session
- **Automation Status:** Manual

### TC-MAN-005 — Verify inventory cannot be accessed after logout using browser Back

- **Preconditions:** User has logged in and then logged out.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Log in. 2. Log out. 3. Press browser Back. 4. Attempt to interact with Inventory.
- **Expected Results:** Protected inventory content is not usable without an authenticated session; user is redirected or required to log in.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Security - Session
- **Automation Status:** Manual

### TC-MAN-006 — Open a product details page

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Test Steps:**
  1. Log in. 2. Click the Sauce Labs Backpack product name. 3. Inspect the detail page.
- **Expected Results:** Detail page shows the product name, description, price, image and add-to-cart control.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Product details
- **Automation Status:** Manual

### TC-MAN-007 — Verify product details match inventory information

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Product: Sauce Labs Backpack; Expected price: $29.99; Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Note the product name and price on Inventory. 2. Open product details. 3. Compare name and price.
- **Expected Results:** Product name and price match between Inventory and product details.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Data consistency
- **Automation Status:** Manual

### TC-MAN-008 — Sort products by name A to Z

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce; Sort: Name (A to Z)
- **Test Steps:**
  1. Select Name (A to Z). 2. Inspect all visible product names from top to bottom.
- **Expected Results:** Names are in ascending alphabetical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-009 — Sort products by name Z to A

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce; Sort: Name (Z to A)
- **Test Steps:**
  1. Select Name (Z to A). 2. Inspect all visible product names from top to bottom.
- **Expected Results:** Names are in descending alphabetical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-010 — Sort products by price low to high

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce; Sort: Price (low to high)
- **Test Steps:**
  1. Select Price (low to high). 2. Inspect all prices from top to bottom.
- **Expected Results:** Prices are in ascending numerical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-011 — Sort products by price high to low

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce; Sort: Price (high to low)
- **Test Steps:**
  1. Select Price (high to low). 2. Inspect all prices from top to bottom.
- **Expected Results:** Prices are in descending numerical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-012 — Remove one item from a cart containing multiple products

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce; Products: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99)
- **Test Steps:**
  1. Add both products. 2. Open Cart. 3. Remove Sauce Labs Backpack. 4. Verify remaining cart contents and badge.
- **Expected Results:** Only Sauce Labs Bike Light remains; cart count reflects one item.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Functional - Cart
- **Automation Status:** Manual

### TC-MAN-013 — Continue shopping from the cart

- **Preconditions:** User is logged in and at least one product has been added to Cart.
- **Test Data:** Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Test Steps:**
  1. Add Sauce Labs Backpack. 2. Open Cart. 3. Click Continue Shopping.
- **Expected Results:** User returns to Inventory and the previously added item remains in the cart.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Navigation - Cart
- **Automation Status:** Manual

### TC-MAN-014 — Cancel checkout and return to cart

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Test Steps:**
  1. Open Cart. 2. Click Checkout. 3. On the information page, click Cancel.
- **Expected Results:** User returns to the prior shopping/cart flow without placing an order; cart contents remain available.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Checkout
- **Automation Status:** Manual

### TC-MAN-015 — Validate missing first name during checkout

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** Username: standard_user; Password: secret_sauce; First name: empty; Last name: Test; Postal code: 500001
- **Test Steps:**
  1. Open Cart. 2. Click Checkout. 3. Leave First Name empty. 4. Enter Test and 500001 in the other fields. 5. Click Continue.
- **Expected Results:** Checkout does not proceed and a first-name-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-016 — Validate missing last name during checkout

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** Username: standard_user; Password: secret_sauce; First name: Avinash; Last name: empty; Postal code: 500001
- **Test Steps:**
  1. Open Cart. 2. Click Checkout. 3. Enter Avinash. 4. Leave Last Name empty. 5. Enter 500001. 6. Click Continue.
- **Expected Results:** Checkout does not proceed and a last-name-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-017 — Verify checkout order overview totals

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack ($29.99); First name: Avinash; Last name: Test; Postal code: 500001
- **Test Steps:**
  1. Add the product. 2. Proceed through checkout information. 3. Inspect item subtotal, tax and total before finishing.
- **Expected Results:** Subtotal matches item prices; tax is displayed; total equals subtotal plus tax.
- **Actual Result:** Not executed manually; record displayed amounts after running this case.
- **Priority:** P1
- **Test Type:** Financial calculation - UI
- **Automation Status:** Manual

### TC-MAN-018 — Verify checkout confirmation after finishing an order

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; First name: Avinash; Last name: Test; Postal code: 500001
- **Test Steps:**
  1. Complete checkout information. 2. Review the order. 3. Click Finish. 4. Inspect confirmation message.
- **Expected Results:** Order-completion confirmation is displayed and checkout is complete.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** End-to-end - Positive
- **Automation Status:** Manual

### TC-MAN-019 — Verify navigation menu options

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** Username: standard_user; Password: secret_sauce
- **Test Steps:**
  1. Open the navigation menu. 2. Inspect menu entries. 3. Close the menu.
- **Expected Results:** Menu options are visible and usable, including All Items, About, Logout and Reset App State where provided by the site.
- **Actual Result:** Not executed manually; record the options observed after running this case.
- **Priority:** P3
- **Test Type:** Navigation
- **Automation Status:** Manual

### TC-MAN-020 — Verify cart is empty when no products have been added

- **Preconditions:** User is logged in and no product has been added during the current session.
- **Test Data:** Username: standard_user; Password: secret_sauce; Initial cart: empty
- **Test Steps:**
  1. Log in. 2. Open Cart without adding products. 3. Inspect cart contents and badge.
- **Expected Results:** Cart has no product rows and no positive item-count badge is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Cart
- **Automation Status:** Manual