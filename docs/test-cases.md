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
- **Test Data:** 1. Open the URL. 2. Enter standard_user. 3. Enter secret_sauce. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Expected Results:** User is redirected to Inventory; Products heading and product cards are visible.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-002 — Locked-out user cannot log in

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Enter locked_out_user. 3. Enter secret_sauce. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: locked_out_user; Password: secret_sauce
- **Expected Results:** Login is blocked and an error explains that the user is locked out.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Negative
- **Automation Status:** Automated

### TC-AUTO-003 — Inventory displays products for a standard user

- **Preconditions:** A valid standard-user login can be performed.
- **Test Data:** 1. Log in. 2. Wait for Inventory. 3. Inspect the Products heading and product cards.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Expected Results:** Inventory loads and the expected product listing is displayed.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-004 — Products can be sorted by price from low to high

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Select Price (low to high). 3. Read displayed product prices in order. 4. Verify each price is less than or equal to the next.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Price (low to high)
- **Expected Results:** Products are ordered by ascending price.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-005 — Add a product to the cart

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Add Sauce Labs Backpack. 3. Check the cart badge.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; Price: $29.99
- **Expected Results:** Cart badge displays 1 and the selected product is added.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Positive
- **Automation Status:** Automated

### TC-AUTO-006 — Remove a product from the cart

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Add Sauce Labs Backpack. 3. Remove it. 4. Check the cart badge and cart contents.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Expected Results:** Product is removed and the cart badge is absent or reflects zero items.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Negative/State change
- **Automation Status:** Automated

### TC-AUTO-007 — Complete checkout successfully

- **Preconditions:** User can log in and the cart can be populated.
- **Test Data:** 1. Log in. 2. Add Sauce Labs Backpack. 3. Open Cart and click Checkout. 4. Enter first name, last name and postal code. 5. Continue. 6. Verify overview. 7. Finish checkout.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; First name: Avinash; Last name: Test; Postal code: 500001
- **Expected Results:** Order confirmation is displayed and indicates that the order is complete.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** End-to-end - Positive
- **Automation Status:** Automated

### TC-AUTO-008 — Invalid credentials display an error

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Enter invalid_user. 3. Enter wrong_password. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: invalid_user; Password: wrong_password
- **Expected Results:** Login is blocked and a clear authentication error is displayed.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P1
- **Test Type:** Functional - Negative
- **Automation Status:** Automated

### TC-AUTO-009 — Empty username displays required-field validation

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Leave Username empty. 3. Enter secret_sauce in Password. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: empty; Password: secret_sauce
- **Expected Results:** Login is blocked and a username-required validation message is displayed.
- **Actual Result:** Previously failed because the emptyUsername test-data entry was undefined. The user subsequently reported the fixes were working; rerun this case to record the current result.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

### TC-AUTO-010 — Empty password displays required-field validation

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Enter standard_user. 3. Leave Password empty. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: empty
- **Expected Results:** Login is blocked and a password-required validation message is displayed.
- **Actual Result:** Previously failed because the emptyPassword test-data entry was undefined. The user subsequently reported the fixes were working; rerun this case to record the current result.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

### TC-AUTO-011 — Product sorting by name A to Z

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Select Name (A to Z). 3. Read product names in display order.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Name (A to Z)
- **Expected Results:** Product names appear in ascending alphabetical order.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-012 — Product sorting by name Z to A

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Select Name (Z to A). 3. Read product names in display order.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Name (Z to A)
- **Expected Results:** Product names appear in descending alphabetical order.
- **Actual Result:** Passed in the latest reported suite after the reported fixes; rerun to confirm on the current commit.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-013 — Products can be sorted by price from high to low

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Select Price (high to low). 3. Read displayed product prices in order. 4. Verify each price is greater than or equal to the next.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Sort option: Price (high to low)
- **Expected Results:** Products are ordered by descending price.
- **Actual Result:** Previously failed because expectDescending was not exported. The user subsequently reported the fixes were working; rerun this case to record the current result.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Automated

### TC-AUTO-014 — Cart shows the correct contents when multiple products are added

- **Preconditions:** User is authenticated and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Add Sauce Labs Backpack. 3. Add Sauce Labs Bike Light. 4. Open Cart. 5. Verify both product names and item count.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Products: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99)
- **Expected Results:** Cart contains exactly two items: Sauce Labs Backpack and Sauce Labs Bike Light.
- **Actual Result:** Previously failed because the bikeLight product-data entry was undefined. The user subsequently reported the fixes were working; rerun this case to record the current result.
- **Priority:** P1
- **Test Type:** Functional - Cart
- **Automation Status:** Automated

### TC-AUTO-015 — Checkout blocks continuation when postal code is missing

- **Preconditions:** User is authenticated and has a product in the cart.
- **Test Data:** 1. Log in. 2. Add Sauce Labs Backpack. 3. Open Cart and click Checkout. 4. Enter first and last name. 5. Leave Postal Code empty. 6. Click Continue.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; First name: Avinash; Last name: Test; Postal code: empty
- **Expected Results:** Checkout does not proceed to the overview and a postal-code-required message is displayed.
- **Actual Result:** Not independently verified in the information provided; record the observed result from the latest test run.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Automated

## Manual test cases (20)

### TC-MAN-001 — Submit login form with both fields empty

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Leave both fields empty. 3. Click Login. 4. Read the error message.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: empty; Password: empty
- **Expected Results:** Login is blocked and the username-required message is displayed.
- **Actual Result:** Not executed manually; record the observed message after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-002 — Submit login form with username only

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Enter standard_user. 3. Leave Password empty. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: empty
- **Expected Results:** Login is blocked and the password-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-003 — Submit login form with password only

- **Preconditions:** Login page is accessible.
- **Test Data:** 1. Open the URL. 2. Leave Username empty. 3. Enter secret_sauce. 4. Click Login.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: empty; Password: secret_sauce
- **Expected Results:** Login is blocked and the username-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-004 — Verify logout ends the user session

- **Preconditions:** User is logged in as standard_user.
- **Test Data:** 1. Log in. 2. Open the navigation menu. 3. Click Logout. 4. Verify the login page is shown.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Expected Results:** User is logged out and the login form is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Security - Session
- **Automation Status:** Manual

### TC-MAN-005 — Verify inventory cannot be accessed after logout using browser Back

- **Preconditions:** User has logged in and then logged out.
- **Test Data:** 1. Log in. 2. Log out. 3. Press browser Back. 4. Attempt to interact with Inventory.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce
- **Expected Results:** Protected inventory content is not usable without an authenticated session; user is redirected or required to log in.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Security - Session
- **Automation Status:** Manual

### TC-MAN-006 — Open a product details page

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Log in. 2. Click the Sauce Labs Backpack product name. 3. Inspect the detail page.
- **Test Steps:**
  URL: https://www.saucedemo.com; Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Expected Results:** Detail page shows the product name, description, price, image and add-to-cart control.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Product details
- **Automation Status:** Manual

### TC-MAN-007 — Verify product details match inventory information

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Note the product name and price on Inventory. 2. Open product details. 3. Compare name and price.
- **Test Steps:**
  Product: Sauce Labs Backpack; Expected price: $29.99; Username: standard_user; Password: secret_sauce
- **Expected Results:** Product name and price match between Inventory and product details.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Data consistency
- **Automation Status:** Manual

### TC-MAN-008 — Sort products by name A to Z

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Select Name (A to Z). 2. Inspect all visible product names from top to bottom.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Sort: Name (A to Z)
- **Expected Results:** Names are in ascending alphabetical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-009 — Sort products by name Z to A

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Select Name (Z to A). 2. Inspect all visible product names from top to bottom.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Sort: Name (Z to A)
- **Expected Results:** Names are in descending alphabetical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-010 — Sort products by price low to high

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Select Price (low to high). 2. Inspect all prices from top to bottom.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Sort: Price (low to high)
- **Expected Results:** Prices are in ascending numerical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-011 — Sort products by price high to low

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Select Price (high to low). 2. Inspect all prices from top to bottom.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Sort: Price (high to low)
- **Expected Results:** Prices are in descending numerical order.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Sorting
- **Automation Status:** Manual

### TC-MAN-012 — Remove one item from a cart containing multiple products

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Add both products. 2. Open Cart. 3. Remove Sauce Labs Backpack. 4. Verify remaining cart contents and badge.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Products: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99)
- **Expected Results:** Only Sauce Labs Bike Light remains; cart count reflects one item.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Functional - Cart
- **Automation Status:** Manual

### TC-MAN-013 — Continue shopping from the cart

- **Preconditions:** User is logged in and at least one product has been added to Cart.
- **Test Data:** 1. Add Sauce Labs Backpack. 2. Open Cart. 3. Click Continue Shopping.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Expected Results:** User returns to Inventory and the previously added item remains in the cart.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Navigation - Cart
- **Automation Status:** Manual

### TC-MAN-014 — Cancel checkout and return to cart

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** 1. Open Cart. 2. Click Checkout. 3. On the information page, click Cancel.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack
- **Expected Results:** User returns to the prior shopping/cart flow without placing an order; cart contents remain available.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Checkout
- **Automation Status:** Manual

### TC-MAN-015 — Validate missing first name during checkout

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** 1. Open Cart. 2. Click Checkout. 3. Leave First Name empty. 4. Enter Test and 500001 in the other fields. 5. Click Continue.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; First name: empty; Last name: Test; Postal code: 500001
- **Expected Results:** Checkout does not proceed and a first-name-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-016 — Validate missing last name during checkout

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** 1. Open Cart. 2. Click Checkout. 3. Enter Avinash. 4. Leave Last Name empty. 5. Enter 500001. 6. Click Continue.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; First name: Avinash; Last name: empty; Postal code: 500001
- **Expected Results:** Checkout does not proceed and a last-name-required message is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** Validation - Negative
- **Automation Status:** Manual

### TC-MAN-017 — Verify checkout order overview totals

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** 1. Add the product. 2. Proceed through checkout information. 3. Inspect item subtotal, tax and total before finishing.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack ($29.99); First name: Avinash; Last name: Test; Postal code: 500001
- **Expected Results:** Subtotal matches item prices; tax is displayed; total equals subtotal plus tax.
- **Actual Result:** Not executed manually; record displayed amounts after running this case.
- **Priority:** P1
- **Test Type:** Financial calculation - UI
- **Automation Status:** Manual

### TC-MAN-018 — Verify checkout confirmation after finishing an order

- **Preconditions:** User is logged in and Cart contains Sauce Labs Backpack.
- **Test Data:** 1. Complete checkout information. 2. Review the order. 3. Click Finish. 4. Inspect confirmation message.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Product: Sauce Labs Backpack; First name: Avinash; Last name: Test; Postal code: 500001
- **Expected Results:** Order-completion confirmation is displayed and checkout is complete.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P1
- **Test Type:** End-to-end - Positive
- **Automation Status:** Manual

### TC-MAN-019 — Verify navigation menu options

- **Preconditions:** User is logged in and Inventory is displayed.
- **Test Data:** 1. Open the navigation menu. 2. Inspect menu entries. 3. Close the menu.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce
- **Expected Results:** Menu options are visible and usable, including All Items, About, Logout and Reset App State where provided by the site.
- **Actual Result:** Not executed manually; record the options observed after running this case.
- **Priority:** P3
- **Test Type:** Navigation
- **Automation Status:** Manual

### TC-MAN-020 — Verify cart is empty when no products have been added

- **Preconditions:** User is logged in and no product has been added during the current session.
- **Test Data:** 1. Log in. 2. Open Cart without adding products. 3. Inspect cart contents and badge.
- **Test Steps:**
  Username: standard_user; Password: secret_sauce; Initial cart: empty
- **Expected Results:** Cart has no product rows and no positive item-count badge is displayed.
- **Actual Result:** Not executed manually; record the observed result after running this case.
- **Priority:** P2
- **Test Type:** Functional - Cart
- **Automation Status:** Manual