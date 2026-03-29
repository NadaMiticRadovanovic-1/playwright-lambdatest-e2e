# Playwright E2E – LambdaTest Ecommerce Playground

End-to-end (E2E) automation testing project built with **Playwright** in **JavaScript**, using the public e-commerce demo site **ecommerce-playground.lambdatest.io**.

This project demonstrates a complete "happy path" purchase flow:
**Login → Add product to cart → Checkout → Fill billing details → Order confirmation**

---

## Tech Stack
- Playwright (`@playwright/test`)
- JavaScript (Node.js)

---

## Project Structure

```
playwright-lambdatest-e2e/
├─ e2e/
│  └─ purchase-flow.spec.js
├─ pages/
│  ├─ HomePage.js
│  ├─ LoginPage.js
│  └─ CheckoutPage.js
├─ test-data/
│  ├─ users.js         # One account per browser (chromium/firefox/webkit)
│  ├─ shippingData.js  # Billing address and telephone
│  └─ products.js      # Product IDs
├─ playwright.config.js
├─ package.json
└─ README.md
```

---

## Test Data

Three separate accounts are required — one per browser — to support parallel test execution without cart conflicts. Register them manually on the site, then update `test-data/users.js` with your credentials:

| Browser  | Email                        | Password        |
|----------|------------------------------|-----------------|
| Chromium | chromium@example.com         | YourPassword    |
| Firefox  | firefox@example.com          | YourPassword    |
| WebKit   | webkit@example.com           | YourPassword    |

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

**Run all tests (all browsers, in parallel):**
```
npx playwright test
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

**View the HTML report after a run:**
```
npx playwright show-report
```

---

## Test Reports & Results

After each test run, Playwright generates two timestamped output folders so previous runs are never overwritten:

- **`playwright-report-<timestamp>/`** — HTML report with a full test summary, screenshots on failure, and traces. Open with `npx playwright show-report playwright-report-<timestamp>`.
- **`test-results-<timestamp>/`** — Raw artifacts per test (screenshots, videos, traces) used by the HTML report.

Both folder patterns are excluded from version control via `.gitignore`. Each run produces a new dated folder, so you can keep and compare reports from multiple runs.
