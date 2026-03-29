import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";
import { generateShippingData } from "../test-data/shippingData";
import { PRODUCTS, getRandomProduct } from "../test-data/products";

// Tests share the same user account per browser — run serially to avoid cart interference
test.describe.configure({ mode: "serial" });

test(
    "Positive flow: add random product to cart and complete full checkout",
    { tag: ["@smoke", "@regression"] },
    async ({ page, browserName }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const loginPage = new LoginPage(page);
        const checkoutPage = new CheckoutPage(page);

        const user = users[browserName];
        await homePage.open();
        await loginPage.login(user.email, user.password);
        await cartPage.clearCart();
        await cartPage.addProductToCart(getRandomProduct());
        await cartPage.goToCheckout();
        await checkoutPage.fillBillingDetails(generateShippingData());
        await checkoutPage.continueDelivery();
        await checkoutPage.selectShippingMethod();
        await checkoutPage.selectPaymentMethod();
        await checkoutPage.confirmOrder();
        await checkoutPage.expectOrderSuccess();
    }
);

test(
    "Positive flow: add multiple different products to cart and complete full checkout",
    { tag: ["@regression"] },
    async ({ page, browserName }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const loginPage = new LoginPage(page);
        const checkoutPage = new CheckoutPage(page);

        const user = users[browserName];
        await homePage.open();
        await loginPage.login(user.email, user.password);
        await cartPage.clearCart();
        await cartPage.addProductToCart(PRODUCTS.HP_LP3065);
        await cartPage.addProductToCart(PRODUCTS.HTC_TOUCH_HD);
        await cartPage.goToCheckout();
        await checkoutPage.fillBillingDetails(generateShippingData());
        await checkoutPage.continueDelivery();
        await checkoutPage.selectShippingMethod();
        await checkoutPage.selectPaymentMethod();
        await checkoutPage.confirmOrder();
        await checkoutPage.expectOrderSuccess();
    }
);

test(
    "Negative flow: login with invalid credentials shows error message",
    { tag: ["@smoke", "@regression"] },
    async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.loginWithInvalidCredentials("invalid@email.com", "WrongPassword123");
        await loginPage.expectLoginError();
    }
);

test(
    "Negative flow: checkout with empty cart shows empty cart warning",
    { tag: ["@smoke", "@regression"] },
    async ({ page, browserName }) => {
        const cartPage = new CartPage(page);
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        const user = users[browserName];
        await homePage.open();
        await loginPage.login(user.email, user.password);
        await cartPage.clearCart();
        await cartPage.goToCheckout();
        await cartPage.expectEmptyCartWarning();
    }
);
