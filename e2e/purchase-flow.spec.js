import { test } from "@playwright/test";

// Tests share the same user account per browser — run serially to avoid cart interference
test.describe.configure({ mode: "serial" });
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";
import { shippingData } from "../test-data/shippingData";
import { PRODUCTS, getRandomProduct } from "../test-data/products";

test("Positive flow: add random product to cart and complete full checkout", async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = users[browserName];
    await homePage.open();
    await loginPage.login(user.email, user.password);
    await homePage.clearCart();
    await homePage.addProductToCart(getRandomProduct());
    await homePage.goToCheckout();
    await checkoutPage.fillBillingDetails(shippingData);
    await checkoutPage.continueDelivery();
    await checkoutPage.selectShippingMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmOrder();
    await checkoutPage.expectOrderSuccess();
});

test("Positive flow: add multiple different products to cart and complete full checkout", async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = users[browserName];
    await homePage.open();
    await loginPage.login(user.email, user.password);
    await homePage.clearCart();
    await homePage.addProductToCart(PRODUCTS.HP_LP3065);
    await homePage.addProductToCart(PRODUCTS.HTC_TOUCH_HD);
    await homePage.goToCheckout();
    await checkoutPage.fillBillingDetails(shippingData);
    await checkoutPage.continueDelivery();
    await checkoutPage.selectShippingMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmOrder();
    await checkoutPage.expectOrderSuccess();
});

test("Negative flow: login with invalid credentials shows error message", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithInvalidCredentials("invalid@email.com", "WrongPassword123");
    await loginPage.expectLoginError();
});

test("Negative flow: checkout with empty cart shows empty cart warning", async ({ page, browserName }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const user = users[browserName];
    await homePage.open();
    await loginPage.login(user.email, user.password);
    await homePage.clearCart();
    await homePage.goToCheckout();
    await homePage.expectEmptyCartWarning();
});
