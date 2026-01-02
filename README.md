# LapCorpDitek_App
Health Care application related to Telemedicine.
This project focuses on the automation of the LabCorp Ditek web application, specifically the Direct To Patient (DTP) module. The application enables healthcare providers and administrators to create and manage lab orders directly for patients. The automation framework is designed to validate business flows end-to-end, improve test coverage, and reduce manual regression effort.

The framework is implemented using Playwright with JavaScript, structured on the Page Object Model (POM) design pattern for scalability and maintainability. Each functional area of the application is divided into dedicated page classes, locator files, and reusable utilities. Login handling, OTP verification, group selection, Direct To Patient workflows, and Orders module interactions are implemented as separate reusable components.

The functional flow begins with user authentication, where valid credentials and OTP verification are performed. After login, the user selects the Direct To Patient group and accesses module-specific functionality. The automation script then performs the complete order creation lifecycle including plan/site information entry, contact details, additional instructions, mail date, lab ticket update, and document upload. It supports both CSV and PDF upload validation, enabling automated handling of common business file operations.

Once an order is successfully submitted, the script interacts with the Orders page to verify listing behavior. It opens order details individually, supports index-based selection, and automates opening of the top five orders sequentially. This helps validate UI rendering stability, view actions, and modal interactions.

The test framework integrates Allure Reporting to provide comprehensive visual test evidence. Each execution generates screenshots, traces, and videos with optional company branding and logo placement. Reports clearly display test step details, execution history, and failure evidence, making defect analysis easier for QA teams and stakeholders.

This automation solution enhances regression capability, minimizes manual repetition, and provides higher confidence during releases. It is flexible enough to support new modules, environments, and data variations using Faker-generated input and configurable JSON-based test data. Overall, the project delivers a robust, maintainable, and enterprise-grade test automation framework tailored for healthcare workflows, ensuring quality, consistency, and performance of the LabCorp Ditek platform.
