# 🧪 Ditek Automation Project (Playwright)

## 📌 Project Overview

This repository contains **end-to-end UI and API automation** for the **Ditek Oncology application**, built using **Playwright (JavaScript)** following **Page Object Model (POM)** best practices.

The framework supports:

* Oncology bulk order flows
* Faker-based dynamic test data
* Stable UI handling for modern UI (MUI drawers, overlays)
* Scalable structure for future modules

---

## 🛠 Tech Stack

* **Automation Tool:** Playwright
* **Language:** JavaScript (ES6)
* **Test Runner:** @playwright/test
* **Design Pattern:** Page Object Model (POM)
* **Test Data:** Faker (@faker-js/faker)
* **Reporting:** Playwright HTML Report
* **Auth Handling:** Login + OTP (static/dynamic)

---

## 📂 Project Structure

```
LabcorpDitekapp/
│
├── pages/
│   └── OncologyFlow/
│       └── bulkOrderCreation.page.js
│
├── locators/
│   └── Oncology/
│       └── oncology.locators.js
│
├── data/
│   └── oncologyFakerData.js
│
├── tests/
│   └── OncologyAllFlows/
│       └── oncologyAllFlows.spec.js
│
├── test-results/
├── playwright.config.js
└── README.md
```

---

## 🧩 Key Features

### ✅ Page Object Model (POM)

* All UI actions are encapsulated inside page classes
* Locators are isolated for easy maintenance

### ✅ Faker-Based Dynamic Data

* Customer PO
* Contact details
* Shipping address
* Each run generates **unique data**

### ✅ Stable UI Handling

* Handles MUI drawer animations
* Prevents flaky clicks (overlay interception)
* Uses Playwright best practices (`waitFor`, `stable`, `visible`)

---

## 🚀 How to Run Tests

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Run All Tests

```
npx playwright test
```

### 3️⃣ Run Specific Test

```
npx playwright test tests/OncologyAllFlows/oncologyAllFlows.spec.js
```

### 4️⃣ Open HTML Report

```
npx playwright show-report
```

---

## 🔐 Login & OTP Handling

* Login flow is automated
* OTP is handled using:

  * Static OTP (for non-prod)
  * Extendable for API-based OTP fetch

---

## 🧪 Bulk Order Flow Covered

1. Login + OTP
2. Group selection (Oncology)
3. Create bulk order
4. Add product to cart
5. Cart & checkout handling
6. Shipping & contact details
7. Place order

---

## ⚠️ Common Issues & Solutions

### Checkout Button Timeout

✔ Fixed by waiting for cart drawer animation
✔ Ensures cart item count > 0 before checkout

### Flaky Clicks

✔ Uses `state: stable`
✔ Avoids force click

---

## 📈 Future Enhancements

* API validation for bulk order creation
* Allure reporting integration
* CI/CD (GitLab / Bitbucket Pipelines)
* Cross-browser execution
* Environment-based configs

---

## 👤 Maintainer

**Haroon Raja**
Senior QA Automation Engineer

---

## 📄 Notes

This framework is designed to be **scalable, stable, and enterprise-ready** and follows industry-standard automation practices.
