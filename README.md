# playwright-learning

This is a personal repository for learning Playwright test automation.

Project currently primarily functions as filling a form in 'form-field.spec.ts', goal is to understand best practices of Playwright as I go.

'comprehensive.spec.ts' tests basic API call functionality and does concurrency checks as well as basic HTTP code checks.

## Features

- **Playwright** - Modern, fast browser automation
- **TypeScript** - Type-safe test automation

## Prerequisites

- Node.js
- Modern web browser (follow instructions if you don't)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/deusion/playwright-learning.git
cd playwright-learning
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

# Running Tests

**Run all tests**
```bash
npx playwright test
```

**Run specific test file**
```bash
npx playwright test tests/form-fields.spec.ts
```
or
```bash
npx playwright test tests/comprehensive.spec.ts
```

**View Test Report**
```bash
npx playwright show-report
```

**Adding new Tests**
Create a new '*name*.spec.ts' file under tests and execute using above instructions