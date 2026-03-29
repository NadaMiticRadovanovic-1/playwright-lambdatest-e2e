import { expect } from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.cartTotal = page.locator("#cart-total");
    }

    async open() {
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
    }

    async expectCartItemCount(count) {
        await expect(this.cartTotal).toContainText(`${count} item(s)`);
    }
}
