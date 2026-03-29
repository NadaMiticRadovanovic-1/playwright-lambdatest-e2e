import { expect } from "@playwright/test";

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Billing details
        this.telephoneInput = page.locator('input[name="telephone"]');
        this.firstNameInput = page.getByTestId("input-payment-firstname");
        this.lastNameInput = page.getByTestId("input-payment-lastname");
        this.addressInput = page.getByTestId("input-payment-address-1");
        this.cityInput = page.getByTestId("input-payment-city");
        this.postCodeInput = page.getByTestId("input-payment-postcode");
        this.countrySelect = page.getByTestId("input-payment-country");
        this.regionSelect = page.getByTestId("input-payment-zone");

        this.termsCheckbox = page.locator('label[for="input-agree"]');
        this.continueBtn = page.getByRole("button", { name: /^Continue/ });

        // Success
        this.successHeading = page.getByRole("heading", { name: "Your order has been placed!" });
    }

    async fillBillingDetails(data) {
        // Telephone is always visible on the one-page checkout
        await this.telephoneInput.clear();
        await this.telephoneInput.fill(data.telephone);

        // If billing form is expanded (new user / no saved address), fill it
        if (await this.firstNameInput.isVisible()) {
            await this.firstNameInput.fill(data.firstName);
            await this.lastNameInput.fill(data.lastName);
            await this.addressInput.fill(data.address);
            await this.cityInput.fill(data.city);
            await this.postCodeInput.fill(data.postCode);
            await this.countrySelect.selectOption({ label: data.country });
            // Wait for region options to load via AJAX after country selection
            await this.page.waitForResponse(resp => resp.url().includes("country") && resp.status() === 200);
            await this.regionSelect.selectOption({ label: data.region });
        }
    }

    async continueDelivery() {
        // One-page checkout — delivery is part of the same form, no separate step
    }

    async selectShippingMethod() {
        await this.page.getByRole("radio", { name: /Flat Shipping Rate/ }).check();
    }

    async selectPaymentMethod() {
        await this.page.getByRole("radio", { name: /Cash On Delivery/ }).check();
    }

    async confirmOrder() {
        if (await this.termsCheckbox.isVisible()) {
            await this.termsCheckbox.click();
        }
        await this.continueBtn.click();
        await this.page.waitForLoadState("networkidle");
        await this.page.getByRole("button", { name: "Confirm Order" }).click();
    }

    async expectOrderSuccess() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.successHeading).toBeVisible({ timeout: 10000 });
    }
}
