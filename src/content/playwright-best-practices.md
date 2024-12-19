---
layout: post
title: Playwright best practices
image: img/unsplash/igor-omilaev-gVQLAbGVB6Q-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [playwright, best practices, test automation]
draft: false
excerpt: Some gems of Playwright best practices
---

Photo by <a href="https://unsplash.com/@omilaev?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Igor Omilaev</a> on <a href="https://unsplash.com/photos/two-hands-touching-each-other-in-front-of-a-pink-background-gVQLAbGVB6Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# Playwright best practices

✅ **DO** keep the ethos of Playwright in mind. The tool is simple and does two things and two things well, perform actions and assert state against expectations. Unlike a lot of other traditional tools, having to wait for things prior to actions or asserts **is not a thing** and when done is usually a smell of something else being wrong.

> These design choices allow Playwright users to forget about flaky timeouts and racy checks in their tests altogether.

✅ **DO** familiarize yourself with useful commands

```bash
# run all tests headless
npx playwright test

# run all tests in debug mode
npx playwright test --debug

# run all tests with parallelization disabled
npx playwright test --workers=1

# run tests with fail-fast
npx playwright test --max-failures=10

# run all tests with tracing on
# this should always be used on CI runs
npx playwright test --trace on

# run a specific test by file name
npx playwright test [test-file-name].ts

# run a specific test by test title
npx playwright test -g [target title]

# run tests that contain certain string in the file name
npx playwright test [target-string] # target strings can be chained

# run specific tests by  directory
npx playwright test test/[directory-name] # directories can be chanined

# run all tests in headed mode
npx playwright test --headed

# run all tests in a specific browser
npx playwright test --project webkit # --project can be chained

# view last run test report
npx playwright show-report

# run all test with the UI
npx playwright test --ui

# run the code gen to generate tests off a browser interaction
npx playwright codegen [optional-url]

# get help 🆘
npx playwright test --help
```

✅ **DO** familiarize yourself with the Playwright [tracing and trace viewer.](https://playwright.dev/docs/trace-viewer-intro)

✅ **DO** familiarize yourself with the various test [annotations](https://playwright.dev/docs/test-annotations)

✅ **DO** consider targeting the [latest LTS node version](https://nodejs.org/en/download) at the point of creating a new Playwright project. This ensures that you start of with the latest guaranteed support with the widest compatibility and stability.

> Consider using [NVM](https://github.com/nvm-sh/nvm) or an alternative, to manage your node versions especially if you are likely to work on multiple things that may end up having different node version requirements.

✅ **DO** make use of the [official Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) for an improved experience.

> The VS Code test runner runs your tests on the default browser of Chrome. To run on other/multiple browsers click the play button's dropdown and choose another profile or modify the default profile by clicking `Select Default Profile` and select the browsers you wish to run your tests on.

✅ **DO** keep your playwright and related dependencies up to date. By updating regularly you keep up with the new features, continued improvements in browser support, bug fixes, compatibility with new features etc. Incrementally updating tends to be much easier than a big bang when you finally need a specific version, especially when dealing with breaking changes.

```bash
npm install -D @playwright/test@latest

# Also download new browser binaries and their dependencies:
npx playwright install --with-deps

# check the version
npx playwright --version
```

> Consider [npm-outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated/) as a tool to manage your dependencies.

> Consider using the [Version Lens extension in VS Code](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens) to check for outdated packages and update them on the click of a button.

✅ **DO** make use of the page object model approach to separate the management of a single page's logic into one source of truth for a clean code structure that encourages the single responsibility making the maintenance of a large test suite over time easier.

This generally makes your tests easier to read at the top level, example:

```typescript
test('given valid details, creating a new credit application from scratch should succeed', async ({
  page,
}) => {
  const businessDetailsPage = new BusinessDetailsPage(page);
  const businessVerificationPage = new BusinessVerificationPage(page);
  const documentsPage = new DocumentsPage(page);

  const businessDetails = new BusinessDetailsBuilder().thatIsValid().build();

  const businessVerification = new BusinessVerificationBuilder().thatIsValid().build();

  const documents = new DocumentsBuilder().thatIsValid().build();

  // submit business details
  await businessDetailsPage.goto();
  await businessDetailsPage.assertInitialState();
  await businessDetailsPage.fill(businessDetails);
  await businessDetailsPage.submit();

  // submit business verification details
  await businessVerificationPage.assertInitialState();
  await businessVerificationPage.fill(businessVerification);
  await businessVerificationPage.submitManualUpload();

  // upload documents
  await documentsPage.assertInitialState();
  await documentsPage.fill(documents);
  await documentsPage.submit();
});
```

A page object model class is generally just a class that accepts a page (or more) and encapsulates any logic about that page like locators, assertions, actions etc. Here is a sample skeleton

```typescript
export class SamplePage {
  public readonly page: Page;
  public readonly doneButton: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.doneButton = this.page.getByRole('button', { name: 'Done' });
  }

  public async assertInitialState() {}

  public async goto() {
    await this.page.goto('/');
  }

  public async submit() {
    await this.doneButton.click();
  }
}
```

✅ **DO** adopt fakers for creating random yet realistic test data. For TypeScript tests, the library [Faker JS](https://fakerjs.dev/) is an excellent choice for this.

✅ **DO** adopt a builder model to separate the creation of test data from everything as with one source of truth that allows for a test suite to remain maintainable. Sample:

```typescript
export class LandLordBuilder extends Builder<LandLord> {
  constructor() {
    super(LandLord);
  }

  public override thatIsValid(): this {
    this.with((x) => x.fullName, faker.person.fullName());
    this.with((x) => x.cellphoneNumber, `0${faker.string.numeric(9)}`);
    this.with((x) => x.emailAddress, faker.internet.email());
    this.with((x) => x.leaseStartDate, faker.date.past());
    this.with((x) => x.leaseEndDate, faker.date.future());
    return this;
  }
}

# Example usage
const landlord = new LandLordBuilder()
  .thatIsValid()
  .build();
```

This example relies on the following base implementation.

```typescript
export interface BuilderBase<T> {
  with<TProp>(propertyExpr: (obj: T) => TProp, value: TProp): this;

  withBuilder<TProp, TBuilder extends BuilderBase<unknown>>(
    propertyExpr: (obj: T) => TProp,
    value: TBuilder,
  ): this;

  withMany<TProp, TBuilder extends BuilderBase<unknown>>(
    propertyExpr: (obj: T) => TProp[],
    values: TBuilder[],
  ): this;

  ignoreProperty<TProp>(propertyExpr: (obj: T) => TProp): this;

  thatIsValid(): this;

  build(): T;
}

export abstract class Builder<T> implements BuilderBase<T> {
  private _properties: { [key: string]: unknown } = {};

  public constructor(private readonly typeConstructor: new () => T) {}

  public with<TProp>(propertyExpr: (obj: T) => TProp, value: TProp): this {
    const propertyName = this.extractPropertyName(propertyExpr);
    this._properties[propertyName] = value;
    return this;
  }

  public withBuilder<TProp, TBuilder extends BuilderBase<unknown>>(
    propertyExpr: (obj: T) => TProp,
    value: TBuilder,
  ): this {
    const propertyName = this.extractPropertyName(propertyExpr);
    this._properties[propertyName] = value.build();
    return this;
  }

  public withMany<TProp, TBuilder extends BuilderBase<unknown>>(
    propertyExpr: (obj: T) => TProp[],
    values: TBuilder[],
  ): this {
    const propertyName = this.extractPropertyName(propertyExpr);
    this._properties[propertyName] = values.map(v => v.build());
    return this;
  }

  public abstract thatIsValid(): this;

  public ignoreProperty<TProp>(propertyExpr: (obj: T) => TProp): this {
    const propertyName = this.extractPropertyName(propertyExpr);
    delete this._properties[propertyName];
    return this;
  }

  public build(): T {
    const instance = this.createInstance();

    for (const key in this._properties) {
      instance[key] = this._properties[key];
    }

    return instance;
  }

  protected createInstance(): T {
    return new this.typeConstructor();
  }

  private extractPropertyName<TProp>(expr: (obj: T) => TProp): string {
    const parts = expr.toString().match(/\.([^.]+)/);
    if (!parts) {
      throw new Error("Couldn't extract property name.");
    }
    return parts[1];
  }
}

export class DynamicBuilder<T> extends Builder<T> {
  public constructor(private readonly typeCtor: new () => T) {
    super(typeCtor);
  }

  public thatIsValid(): this {
    throw new Error('Method not implemented.');
  }
}
```

✅ **DO**  consider configuring a base URL for your tests so this can be defined in one place and reused across your tests.

```typescript
export default defineConfig({
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
});
```

✅ **DO**  consider reading any application configuration, regardless of source (environment variables, key vault secrets etc), in a central run once fixture.

Example. This will pull values from a .env file using [dotenv](https://www.npmjs.com/package/dotenv) and pull user secrets from an [Azure Key Vault](https://azure.microsoft.com/en-gb/products/key-vault) using a getSecret utility method.

```typescript
import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { env } from 'process';

import { getSecret } from '../helpers/secrets';

type ConfigurationFixture = {
  configuration: Configuration;
};

export const test = base.extend<ConfigurationFixture>({
  configuration: async ({}, use) => {
    dotenv.config();

    const secrets: Configuration = {
      userPassword: await getSecret('user-password'),
      imitateEmailAuth: await getSecret('websocket-auth'),
      userEmail: env.UserEmail as string,
    };
    await use(secrets);
  },
});
```

getSecret utility

```typescript
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

const credential = new DefaultAzureCredential();
const vaultName = '[vault name]';
const url = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(url, credential);

/**
 * Retrieves a secret from Azure Key Vault based on the given secret name.
 * @param name The name of the secret to retrieve.
 * @returns The value of the secret as a string.
 * @throws Will throw an error if unable to retrieve the secret.
 */
export const getSecret = async (name: string) => {
  try {
    const secret = await client.getSecret(name);
    return secret.value as string;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

✅ **DO** write tests that assert the visible behaviour of your application and not on the inner workings. This will make your tests more resilient to changes in the underlying implementation. Examples of good things to check

- Elements on the page and their state i.e. what is visible, what is enabled etc.
- The URL of the page
- The title of the page
- A screenshot of the page

Examples of things that may be less resilient to changes

- The exact structure of the DOM
- The CSS classes used on elements

✅ **DO** critically think through and configure the desired browsers and devices to run your tests on. This will ensure that your tests are running on the platforms that are most important to you and will help you catch issues early.

```typescript
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    } /* Test against mobile viewports. */,
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    } /* Test against branded browsers. */,
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
```

✅ **DO** fast track your process by leveraging the [Playwright test generator](https://playwright.dev/docs/codegen-intro) to create tests for you. This will give you a good starting point and you can then modify the tests to suit your needs.

```bash
npx playwright codegen [optional-url]
```

> You can also generate tests using [emulation](https://playwright.dev/docs/test-use-options) to generate a test for a specific viewport, device, color scheme, as well as emulate the geolocation, language or timezone.

✅ **DO** enable retries on CI to make your tests more resilient to flakiness.

✅ **DO** enable tracing to help diagnose failing tests in CI.

> Traces and debugging can also be leveraged locally to diagnose issues with your tests.

✅ **DO** make use of test hooks (`test.describe`, `test.beforeEach`, `test.afterEach`, `test.beforeAll`, `test.afterAll`) for grouping and granular tests to make sure each test is specific and focused. This will make it easier to diagnose failures and will make your tests more resilient to changes in the application.

✅ **DO** keep up with the [Playwright release notes]([Release notes | Playwright](https://playwright.dev/docs/release-notes)) as a nice way to see what new APIs are being released.

✅ **DO** setup linting for your playwright tests with the [ESLint plugin for Playwright.]([eslint-plugin-playwright - npm (npmjs.com)](https://www.npmjs.com/package/eslint-plugin-playwright)). Enable caching with your linting for faster subsequent runs.

```bash
npm init @eslint/config@latest
```

Sample .eslintrc.json config

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended"
  ],
  "rules": {},
  "env": {
    "browser": true,
    "es2021": true
  }
}
```

```json
# in package.json
  "scripts": {
    "lint": "eslint \"**/*.ts\" --cache"
  },
  "lint-staged": {
    "*.ts": "eslint --cache"
  }
```

✅ **DO** consider [lint staged](https://github.com/lint-staged/lint-staged) as a way to be able to run linting only for the files that you have just changed. `npm install -D lint-staged`

```json
# in package.json
  "lint-staged": {
    "*.ts": "eslint --cache"
  }
```

⚠️ **DO** give close attention to the need for any waits or sleeps in your tests. This is a common source of flakiness and should in most cases not be necessary given how Playwright is designed to work.

> Playwright assertions are designed in a way that they describe the expectations that need to be eventually met.

> Playwright automatically waits for the wide range of actionability checks to pass before performing each action.

✅ **DO** make use of an .env file to have a single source of truth for environment values. You can conveniently load env files globally by adding this into your `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Read from default ".env" file.
dotenv.config();
```

✅ **DO** write custom assertions to simplify assertions you use in combination or common things you assert that require custom logic.

```typescript
import type { Locator } from '@playwright/test';
import { expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
    async toBeVisibleAndEmpty(locator: Locator) {
        const assertionName = 'toBeVisibleAndEmpty';
        const isVisible = await locator.isVisible();
        if (!isVisible) {
            return {
                message: () => `expected locator to be visible`,
                pass: false,
            };
        }

        const content = await locator.textContent();
        const isEmpty = content?.trim() === '';
        if (!isEmpty) {
            return {
                message: () => `expected locator to be empty, but got "${content}"`,
                pass: false,
            };
        }

        return {
            message: () => `locator is visible and empty`,
            pass: true,
            name: assertionName
        };
    },
...
});

```

🛑 **DO** not hard code secrets in tests or any artifact that will be committed to your repository. Consider making use of an Azure Key Vault instead.

Sample helper

You will need to install the following package

```bash
npm install -D @azure/keyvault-secrets
npm install -D @azure/identity
```

You will need to have at minimum the Azure IAM `Key Vaults Secret User` role assigned.

## Automation Plan Checklist

Here is a list of questions you can ask yourself about what you want to automate so you can have a clear plan of action before you start. If you roll with the punches, you will be a slave to so many things that you will have much more control by planning and deciding.

- [ ] What language am I going to target?
- [ ] How am I going to use fixtures?
  - [ ] What scenarios do I need isolation for?
  - [ ] What state do I need to share among multiple tests?
- [ ] What are the most important things to automate? 💡Prioritize critical paths
  - [ ] What are my blockers?
  - [ ] Do I need static data?
    - [ ] Do I need setup scripts?
    - [ ] Can this data always be available?
  - [ ] Do I need cleanup scripts?
  - [ ] Can I group these into common themes that I can run as parameterized tests?
  - [ ] How am I going to structure and name my tests?
  - [ ] What things are required by multiple tests that I can make helpers for?
  - [ ] Do I need to test for accessibility?
- [ ] What browsers do I need to target?
  - [ ] What devices do I need to emulate?
  - [ ] What viewports am I interested in?
  - [ ] Do I need to emulate locales?
  - [ ] Do I need to emulate time zones?
  - [ ] Do I need to emulate system permissions?
  - [ ] Do I need to emulate geolocation?
  - [ ] Do I need to emulate colors schemes and media?
  - [ ] Do I need to emulate being offline?
- [ ] What are the tough challenges I need to solve?
  - [ ] How am I going to handle authentication?
    - [ ] Do I need to share the authentication state among multiple tests?
  - [ ] Do I have to worry about MFA?
  - [ ] Do I have to emulate failing requests?
- [ ] Am I ready to automate runs in CI?
  - [ ] How will I report on failing tests and how can I get more details on that?
  - [ ] Do I have everything working locally consistently?
  - [ ] How many workers can my CI handle?
  - [ ] Do I have exit hatches for my CI to preserve resources?
  - [ ] What type of reports do I want to ship?
  - [ ] Do I want to automate retries on fail?
  - [ ] Do I have linting in place?
  - [ ] Do I have any flaky tests to address?
  - [ ] Do I have to worry about things like VPN requirements?
  - [ ] What is the best time to run the automations? Are there potential interruptions in that window like deployments?
- [ ] Do I have any reason to update the default timeouts? (Expect 5s, Test timeout 30s)
  - [ ] Does this need to be global or per test?
- [ ] Are there any out-of-the-box packages that can simplify my test efforts?
- [ ] Are there scenarios I can make use of visual comparisons?
- [ ] Do I need to save videos of my test runs?
- [ ] How am I going to handle secrets?
- [ ] Have I setup a code review process?
