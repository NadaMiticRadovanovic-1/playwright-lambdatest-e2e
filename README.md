# Playwright E2E – LambdaTest Ecommerce Playground

End-to-end (E2E) automation testing project built with **Playwright** in **JavaScript**, using the public e-commerce demo site **ecommerce-playground.lambdatest.io**.

This project covers both positive and negative end-to-end test flows across the full purchase journey.

## Test Coverage

| # | Type | Tag | Description |
|---|------|-----|-------------|
| 1 | Positive | `@smoke` `@regression` | Login, add a random product to cart, complete full checkout |
| 2 | Positive | `@regression` | Login, add multiple different products to cart, complete full checkout |
| 3 | Negative | `@smoke` `@regression` | Login with invalid credentials — verify error message is shown |
| 4 | Negative | `@smoke` `@regression` | Login, empty the cart, attempt checkout — verify empty cart warning |

All 4 tests run across **Chromium, Firefox, and WebKit** (12 tests total).

---

## Tech Stack
- Playwright (`@playwright/test`)
- JavaScript (Node.js)
- Faker.js (`@faker-js/faker`) — dynamic test data generation
- dotenv — environment variable management

---

## Project Structure

```
playwright-lambdatest-e2e/
├─ e2e/
│  └─ purchase-flow.spec.js
├─ pages/
│  ├─ HomePage.js       # Home page and cart count assertions
│  ├─ CartPage.js       # Cart actions (add, clear, checkout)
│  ├─ LoginPage.js      # Login and error assertions
│  └─ CheckoutPage.js   # Billing, shipping, payment, order confirmation
├─ test-data/
│  ├─ users.js          # Reads credentials from .env
│  ├─ shippingData.js   # Generates random billing data via Faker
│  └─ products.js       # Confirmed in-stock product IDs
├─ .env.example         # Template — copy to .env and fill in your credentials
├─ playwright.config.js
├─ package.json
└─ README.md
```

---

## Environment Setup

Credentials are stored in a `.env` file that is **never committed to git**.

**1. Copy the example file:**
```
cp .env.example .env
```

**2. Fill in your credentials in `.env`:**
```
CHROMIUM_EMAIL=your_chromium_email@example.com
CHROMIUM_PASSWORD=YourPassword
FIREFOX_EMAIL=your_firefox_email@example.com
FIREFOX_PASSWORD=YourPassword
WEBKIT_EMAIL=your_webkit_email@example.com
WEBKIT_PASSWORD=YourPassword
```

Three separate accounts are required — one per browser — to prevent cart conflicts when tests run in parallel. Register them manually on [ecommerce-playground.lambdatest.io](https://ecommerce-playground.lambdatest.io).

---

## Setup & Installation

**Install dependencies:**
```
npm install
```

**Install Playwright browsers:**
```
npx playwright install
```

---

## Running Tests

**Run all tests (all browsers):**
```
npx playwright test
```

**Run only smoke tests:**
```
npx playwright test --grep @smoke
```

**Run only regression tests:**
```
npx playwright test --grep @regression
```

**Run with visible browser:**
```
npx playwright test --headed
```

**Run a specific browser:**
```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run with interactive UI:**
```
npx playwright test --ui
```

---

## Test Reports & Results

After each test run, Playwright generates two timestamped output folders so previous runs are never overwritten:

- **`playwright-report-<timestamp>/`** — HTML report with a full test summary, screenshots on failure, and traces. Open with `npx playwright show-report playwright-report-<timestamp>`.
- **`test-results-<timestamp>/`** — Raw artifacts per test (screenshots, videos, traces) used by the HTML report.

Both folder patterns are excluded from version control via `.gitignore`. Each run produces a new dated folder, so you can keep and compare reports from multiple runs.
