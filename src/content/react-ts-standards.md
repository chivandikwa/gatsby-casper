---
layout: post
title: TypeScript and React standards
image: img/dandelion.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-30T10:00:00.000Z
tags: [vscode, extensions]
draft: false
excerpt: personal take on how best to work with TypeScript and React
---

I thought it might be worthwhile to share my very opinionated take on how best to work with TypeScript and React.

# Best Practice

✅ **DO** make a habit to use lint staged (`npx lint-staged`) to lint currently staged files. This is a more manageable way to ensure that you are not introducing lint violations.

✅ **DO** consider running the following commands before opening a Pull Request or committing your code to a team repo. `npm run lint --verbose`, `npm run test`, `npm run build`.

> ℹ `npm run lint --verbose` will run linting only on git staged files showing you both warning and errors. Errors need to be addressed and verification in our pipelines will fail if not, do not introduce new warnings and apply the `Boyscout` rule to help cut down on existing warnings in your team.

✅ **DO** prefer interface. Use type when you need specific features offered by types.

✅ **DO** prefer pure functions. Given the same input, the same data should be retrieved. Avoid mutations or any other side effects in functions. The effect will be functions that are easy to reason about, easy to consume with no assumptions and certainly easier to test as well.

✅ **DO** Use const and let over var, using let only where mutation is expected. The scoping semantics of var lead to bugs.

> ℹ This rule should be enforced in linting.

✅ **DO** favor the use of the use of modern javascript features over the more classic counterparts. Examples of features to be familiar with:

- Template literals (string interpolation)
- Rest and spread operators
- Destructuring assignments
- Object literals
- Arrow functions
- Yield
- Ternary operator
- Nullish coalescing operator
- Promises
- async and await

✅ **DO** familiarize yourself with array methods.

- find
- some
- every
- includes
- map
- filter
- reduce

✅ **DO** avoid direct mutations on arrays like sorts. Instead make copies with the spread operator or use slicing.

✅ **DO** Favor arrow functions for consistent lexical scoping (no mix of lexical and dynamic scoping)

> ℹ Apply caution with arrow functions on render, each render will see a new function and this can lead to unnecessary child renders.

✅ **DO NOT** use arrow functions for class methods or object literal (this will be scoped to caller).

✅ **DO** favor functional map, filter, reduce, forEach, some ect over collection mutation.

✅ **DO** favor Sets for array operations like querying, uniqueness etc.

⛔ **DO NOT** abuse optional chaining (Elvis Operator). Only use this when necessary.

```typescript
// APPLY CAUTION
const streetName = user?.address?.street?.name;
```

⛔ **DO NOT** import all from a given module.

```typescript
// BAD
import *
```

⛔ **DO NOT** `as` unless absolutely required. Type assertions with as in TypeScript remove static type checking which can lead to issues.

⛔ **DO NOT** use `Partial<T>` unless absolutely required. This would be similar to abusing the as keyword to map types.

```typescript
interface User {
  name: string;
}

// BAD
const getUser = () => {
  return {
    name: 'John Doe',
  } as User;
};

// GOOD
const getUser = (): User => {
  return {
    name: 'John Doe',
  };
};
```

> ℹ `as` should hardly be used unless 'type inference' is indeed intended for instance if you receive something from a 3rd party lib such as a value on an event and you know the type and what TS to infer that then those are arguably valid cases for as but can still actually be avoided.

⛔ **DO NOT** use indexes when working with axios response. While type inference can help pinpoint when wrong index is used, there are a lot of edge cases where this would not help out.

```typescript
useEffect(() => {
  const promises = Promise.all([userClient.getProfile(), proposalClient.getAll()]);

  promises.then(response => {
    let profile = response[0].data;
    let people = response[1];
  });
}, []);

// BETTER
useEffect(() => {
  const promises = Promise.all([userClient.getProfile(), proposalClient.getAll()]);

  promises.then(([{ data: profile }, people]) => {});
}, []);
```

# Components

✅ **DO** create small composable components, much like lego pieces that plug together, over large monolithic components. This allows for easier to reason about components that are easy to reuse and test and can make responsibility boundaries very clear and in particular help isolate state.

✅ **DO** identify generic parts of a component upfront that can be reused and code these generically enough to be shared.

✅ **DO** ensure that the component file name is the same as the default export component.

✅ **DO** choose an approach for your team on how to use css, will it be normal css, styled components, emotion, css modules etc. Keep this consistent and in particular do not make use of inline styles.

✅ **DO** favor function components.

✅ **DO** destructure props as consts at the top of the component to guard against accidental mutations.

```typescript
export const Component: React.FunctionComponent<ComponentProps> = React.memo((props) => {
    const { a, b, c, d } =
        props;
        ...
}
```

✅ **DO** mark type properties readonly accordingly to avoid direct mutations.

```typescript
interface ComponentState {
  userIds: number[];
  name: string;
  owner: User;
}

interface User {
  name;
}

export const Component: React.FunctionComponent<{}> = () => {
  const [state, setState] = useState<ComponentState>();

  // these mutations are valid
  state.userIds = [];
  state.userIds.push(1);
  state.name = '';
  state.owner = { name: '' };
  state.owner.name = '';

  return null;
};
```

```typescript
interface ComponentState {
  readonly userIds: ReadonlyArray<number>;
  readonly name: string;
  readonly owner: Readonly<User>;
}

interface User {
  name;
}

export const Component: React.FunctionComponent<{}> = () => {
  const [state, setState] = useState<ComponentState>();

  // these mutations are not valid
  state.userIds = [];
  state.userIds.push(1);
  state.name = '';
  state.owner = { name: '' };
  state.owner.name = '';

  return null;
};
```

✅ **DO** use dynamic properties to make mutation logic simpler.

```typescript
export const Component: React.FunctionComponent<{}> = () => {
  const [state, setState] = useState<ComponentState>();

  setState(prevState => ({
    ...prevState,
    [field]: value,
  }));
};
```

✅ **DO** wrap component in React.memo if same props should always result in same render result.

✅ **DO** ensure that element keys are always stable, predictable, and unique. Unstable keys (like those produced by Math.random() or use of array indexes) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components. See [example](https://jsbin.com/wohima/edit?output).

✅ **DO** apply care when writing conditional renders on variables, use of falsy numbers will be rendered i.e `numberValue && <Component>' given 0 for numberValue will render 0. This however works well with bools null undefined.Alternatively you can apply the following:

```typescript
// BAD
names.length && <Users names={names}>

// ALTERNATIVE
names.length > 0 && <Users names={names}>

// ALTERNATIVE
Boolean(names.length) && <Users names={names}>
```

✅ **DO** pass all props down to a child component when implementing the render props pattern.

✅ **DO** expose render component props from the wrapper when implementing the render props pattern. Best not to pick and expose as custom props upfront, usually exposing all makes for a flexible and un-opinionated render props wrapper.

✅ **DO** be mindful of the number of components that have state. If a value is not required for render it can be tracked without using state. Given a parent -> child hierarchy it may be possible to only track state at the parent.

✅ **DO** use correct import syntax (import 'x') if importing only for side effects.

✅ **DO** take time to identify and document your team's standards and best practices.

✅ **DO** make use of linting to enforce the standards and best practices you setup for your team.

```typescript
import '@testing-library/jest-dom/extend-expect';
```
⛔ **DO NOT** use the React qualifier unnecessarily, i.e `React.Fragment`. Imports can be handled acorrdingly to make use of just `Fragment`.

⛔ **DO AVOID** customizing 3rd party components such extensively via css. Instead the customization should be done via props, css mainly reserved for layout in this cases. Such customizations are not upgrade friendly.

⛔ **DO AVOID** uncontrolled components, that is those that access the dom directly i.e refs unless absolutely necessary.

⛔ **DO AVOID** using render functions, this should be done sparingly and with care. Not that splitting component renders with functions can be good but largely an anti-pattern that can hide the fact that a component has gotten too large or has multiple concerns. This approach should be highly avoided for declarative code. Certain react specific heuristics are not applied when you use render functions, i.e if you have a map and call a render function React cannot and will not warn you about the need for a key and you can get away with passing unstable values like indexes to use as a key and again React cannot and will not warn you. Another really nasty thing that happens with render functions is that if you are using react dev tools, they will not show up but their children will.

⛔ **DO NOT** have constants scattered all over component file. Neatly place all constants at the top of the component.

⛔ **DO NOT** use certain CSS and HTML constructs such as `<br/>`, `<center></center>`, element styles etc. As a general rule, HTML should define structure and any styling or layout should be handled by CSS.

⛔ **DO NOT** use string literals all over your code base. Make use of consts nicely organized in files by concern.

⛔ **DO NOT** use string literals for type properties, this is not refactor friendly. Make use of constraints, for example the accepted values with use of `Extract<T,U>`

# Hooks

✅ **DO** follow the rules of hooks:

- Only Call Hooks at the Top Level
  > Don’t call Hooks inside loops, conditions, or nested functions.
- Only Call Hooks from React Functions
  > Don’t call Hooks from regular JavaScript functions. Instead, you can call Hooks from React function components or from custom Hooks

> ℹ These rules should be enforced in linting.

✅ **DO** name hooks with use prefix i.e `useCancellablePromise`.

✅ **DO** consider creating custom hooks to encapsulate custom logic where applicable i.e `useYourImagination`

⛔ **DO NOT** have hooks scattered all over component file. Neatly place all hooks at the top of the component.

# Jest and React Testing library

✅ **DO** group related tests under a describe if multiple tests are in one file such as with tests for utils.

✅ **DO** place file in the folder of the file being tested under folder named **tests**

✅ **DO** name test files with suffix tests i.e `utils.test.ts`, `breadCrumbs.test.tsx`

✅ **DO** favor data driven tests with test.each over duplicated tests

```typescript
test.each([
  [new Date(2000, 11, 12), false],
  [new Date(1970, 11, 12), false],
  [new Date(1969, 11, 12), true],
  [new Date(1950, 11, 12), true],
])('testing something with dates', (date: Date, expected: boolean) => {
  expect(somethingWithDates(date)).toBe(expected);
});
```

✅ **DO** favor naming tests in the format given then should or given when then should. Long test names are perfectly fine.

✅ **DO** make it easy to tell apart the Arrange, Act and Assert sections of your test and in particular to test what the system under test (sut) is.

✅ **DO NOT** have magic values in tests. Simple things like inlining variables to have name can go a long way in test readability.

```typescript
// BAD - why is this value of significance?
expect(result.count).toBe(24);
```

✅ **DO** use the most specific assertions, these give the most specific and useful failure messages as well.

✅ **DO** move init that is not react specific and does not need to be reinitialized on rerender out of function component. A classic example is initializing an axios client. Keep in mind that the function component body is recalled on each render, therefore re-init such objects.

⛔ **DO NOT** suppress linting rules, these are in place for a reason. Do consult other developers before suppressing rules, whether for specific code lines, files or entire workspace

⛔ **DO NOT** write tests with a multiple responsibilities, instead a test should have a single focus. Multiple unrelated assertions are a red flag.

⛔ **DO NOT** have conditional logic in tests. Rather make data driven tests with theories or separate tests even.

⛔ **DO NOT** use ReactTestUtils. Use React Testing Library which is designed to enable and encourage writing tests that use your components as the end users do. ReactTestUtils has features like mock element, which do not simulate how a user will use the components and encourages
very bad testing approaches.
