import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByLabel("E-Mail Address");
        this.passwordInput = page.getByLabel("Password");
        this.loginBtn = page.getByRole("button", { name: "Login" });
        this.myAccountLink = page.getByRole("link", { name: "My Account" }).first();
    }

    async login(email, password) {
        await this.page.goto("/index.php?route=account/login", {
            waitUntil: "domcontentloaded",
        });
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await expect(this.myAccountLink).toBeVisible();
    }

    async loginWithInvalidCredentials(email, password) {
        await this.page.goto("/index.php?route=account/login", {
            waitUntil: "domcontentloaded",
        });
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async expectLoginError() {
        await expect(this.page.locator(".alert-danger")).toBeVisible();
    }
}
