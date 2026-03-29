import { expect } from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator("#cart-total");
    }

    async open() {
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
    }

    async clearCart() {
        await this.page.goto("/index.php?route=checkout/cart", { waitUntil: "domcontentloaded" });
        // Remove all items one by one until cart is empty
        while (true) {
            const removeBtn = this.page.locator('button[data-original-title="Remove"]').first();
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
        await this.page.goto("/index.php?route=checkout/checkout", {
            waitUntil: "domcontentloaded",
        });
    }

    async expectEmptyCartWarning() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(
            this.page.getByText("Your shopping cart is empty!").first()
        ).toBeVisible({ timeout: 10000 });
    }
}
