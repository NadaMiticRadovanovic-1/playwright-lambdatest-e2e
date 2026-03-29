import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartTotal = page.locator("#cart-total");
    }

    async clearCart() {
        await this.page.goto("/index.php?route=checkout/cart", { waitUntil: "domcontentloaded" });
        while (true) {
            const removeBtn = this.page.getByRole("button", { name: "Remove" }).first();
            if (!await removeBtn.isVisible()) break;
            await removeBtn.click();
            await this.page.waitForLoadState("domcontentloaded");
        }
    }

    async addProductToCart(productId) {
        await this.page.goto(
            `/index.php?route=product/product&product_id=${productId}`,
            { waitUntil: "domcontentloaded" }
        );
        await this.page.locator(".button-cart:not([disabled])").last().click();
        await expect(this.page.getByRole("link", { name: "View Cart" })).toBeVisible();
    }

    async goToCheckout() {
        await this.page.goto("/index.php?route=checkout/checkout", { waitUntil: "domcontentloaded" });
    }

    async expectEmptyCartWarning() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(
            this.page.getByText("Your shopping cart is empty!").first()
        ).toBeVisible({ timeout: 10000 });
    }
}
