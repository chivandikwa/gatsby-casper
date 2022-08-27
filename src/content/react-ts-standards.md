---
layout: post
title: TypeScript and React standards
image: img/clean/used/oslo-statue.jpg
author: [Thulani S. Chivandikwa]
date: 2021-09-17T10:00:00.000Z
tags: [vscode, extensions]
draft: false
excerpt: personal take on how best to work with TypeScript and React
---

I thought it might be worthwhile to share my very opinionated take on how best to work with TypeScript and React.

# React Standards and Best Practice

✅ **DO** consider lint staged with your linting setup (`npx lint-staged --verbose`) to lint currently staged files. This is a more manageable way to ensure that you are not introducing lint violations. This is particularly useful when linting is added later and you have some cleanups to do as this will avoid you being overwhelmed with lint information about the whole project, only the files you have touched.

> ℹ `lint-staged` with `--verbose` flag will run linting only on git staged files showing you both warning and errors.

✅ DO run eslint with the cache flag `--cache` enabled which will only lint files changed since the last run. This may have a big impact on developer setups. Continuous integration setups will benefit if you do not use clean build agents for each run which can greatly reduce pipeline run times.

✅ **DO** prefer the use of interfaces over type aliases. Use type when you need specific features offered by types. The key driver is that interfaces can always be extendable while types cannot. Because interfaces map more closely to how objects work these are a good default. However, if you cannot express a type with an interface and need to use union or tuple types then type aliases would be a better choice.

✅ **DO** check for console runtime errors and warnings as part of your manual testing before committing to a task, there could be useful things that show up there that are easily overlooked and often easier to act when you notice them when issues are introduced.

✅ **DO** prefer pure functions. Given the same input, the same data should always be retrieved. Avoid mutations or any other side effects in functions. The effect will be functions that are easy to reason about, easy to consume with no assumptions, and certainly easier to test as well.

✅ **DO** use `const` and `let` over `var`, using let only where a mutation is expected. The scoping semantics of var leads to bugs.

> ℹ Utilize linting to enforce low-hanging fruit standards like this.

> ℹ️ In many cases you can avoid mutable variables altogether, hence let, by thinking in a more functional way when writing code.

✅ **DO** use `!x` instead of `x==null`. This avoids the confusion with `x===null`, the former is intentionally meant to catch both null and undefined but that situation is not exactly idiomatic and can accidentally get refactored or written incorrectly in the first place as the latter.

```typescript
if (!x) {
  //'x' is falsey, so it will evaluate to false when undefined, null, or zero (0)
}
```

✅ **DO** favor the use of modern Javascript features over the more classic counterparts. Examples of features to be familiar with:

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

✅ **DO** familiarize yourself with the following array methods and avoid custom implementations or 3rd party libraries for these scenarios.

- find
- some
- every
- includes
- map
- filter
- reduce

> ℹ Favor functional map, filter, reduce, forEach, some etc over collection mutation

✅ **DO** favor the use of absolute imports over relative imports.

```typescript
// given src/services/translate.ts

// an import from /src/../something.ts
import { translate } from '../../services/translate';

// changes to this regardless of where imported from
import { translate } from 'services/translate';
```

Can be achieved by adding the following to tsconfig.json

```json
 "compilerOptions": {
  "baseUrl": "src"
}
```

If we want to tell local imports apart from the rest we can use aliasing

```json
 "compilerOptions": {
    "baseUrl": "./",
    "paths": {
    "~component/*": ["src/components/_"],
     }
}

// import {Login} from ‘~component/Login;
```

✅ **DO** avoid direct mutations on arrays like calling sort. Instead, make copies with the spread operator or use slicing before calling these mutations.

✅ **DO** Favor arrow functions for consistent lexical scoping (no mix of lexical and dynamic scoping).

> ℹ Apply caution with arrow functions on render with React, each render will see a new function and this can lead to unnecessary child renders.

> See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for more detailed comparison between arrow functions and traditional functions.

✅ **DO** favor Sets for array operations like querying, uniqueness, etc.

✅ **DO** favor await of async methods over the traditional `then` and `catch`.

```typescript
promise.then(result => console.log(result)).catch(result => console.log(result));

// looks closer to how we are doing it in C# as well
// less nesting -> easier to read
try {
  const result = await promise;
  console.log(result);
} catch (e) {
  console.log(e);
}
```

✅ **DO** use the object spread syntax over `Object.assign` to shallow-copy objects.

> ℹ This can be enforced with eslint prefer-object-spread rule.

✅ **DO** familiarize yourself with the collection entries method and its use with destructuring.

```typescript
var data = [1, 2, 3];

for (const [index, element] of data.entries())
    ...
```

✅ **DO** use double quotes for strings.

⛔ **DO NOT** use arrow functions for class methods or object literal (this will be scoped to the caller).

⛔ **DO NOT** use objects as maps. Make use of the JavaScript Map object when a dictionary-like type is required.

> ℹ See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) for a comparison of maps to objects.

⛔ **DO NOT** abuse optional chaining (Elvis Operator). Use it to show intent (that the object is nullable) and not as a safety net for cases where something would not be null.

```typescript
// should be intentional
// falsy used gives impression the whole chain from the user can be nullable
// the typing of what is being operated on should reflect this as well
const streetName = user?.address?.street?.name;
```

⛔ **DO NOT** import all from a given module.

```typescript
// BAD
import *
```

⛔ **DO NOT** make use of `as` unless absolutely required. Type assertions with `as` in TypeScript remove static type checking which can lead to issues.

```typescript
interface User {
  name: string;
}

// BAD
// adding a new property on User for instance would not cause an error here
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

⛔ **DO NOT** use `Partial<T>` unless absolutely required. This would be similar to abusing the `as` keyword to map types.

> ℹ `as` should hardly be used unless 'type inference' is indeed intended for instance if you receive something from a 3rd party lib such as a value on an event and you know the type and want TS to infer that then such would arguably be a valid case for `as` but can still actually be avoided.

⛔ **DO NOT** favor the use of indexes when working with arrays if avoidable. Using an example with Axios responses, while type inference can help pinpoint when the wrong index is used, there are a lot of edge cases where this would not help out.

```typescript
useHook(() => {
  promise.then(response => {
    let profile = response[0].data;
    let user = response[1];
  });
}, []);

// BETTER
useHook(() => {
  promise.then(response => {
    const [{ data: profile }, user] = response;
  });
}, []);
```

# Feature best practices

✅ **DO** consider localizing all user-visible strings. If you go with localization then this should be done consistently.

✅ **DO** consider adding dirty checks to UIs that require explicit saving and provide user prompts on navigating away with changes.

# Components

✅ **DO** create small composable components, much like lego pieces that plug together, over large monolithic components. This allows for easier to reason about components that are easy to reuse and test. This can also make responsibility boundaries very clear and in particular help isolate the state. This can also lead to more readable JSX.

```typescript

// what does this do?
<div className={styles.userPanel}>
    <div>
        <div className={styles.detailsRow>
            <span className={styles.detailsColumnLeft}></span>
            </span>
        </div>
        <div className={styles.detailsRow}>
            <span className={styles.detailsColumnLeft}></span>
            <span className={styles.detailsColumnRight}></span>
            <span className={styles.detailsColumnRight}></span>
        </div>
    </div>
</div>
// contents above were removed for brevity, but imagine the mess!

// same component with composition
<ActivityPanel>
    <DetailsRow>
        <Name />
        <Completion />
    </DetailsRow>
    <DetailsRow>
        <DueDate />
        <CriticalPath />}
        <Buffer />}
    </DetailsRow>
</ActivityPanel>
```

✅ **DO** create `safe` defaults to state. This can make for cleaner code as opposed to say handling undefined in multiple areas. One less obvious problem when working with side effects such as network calls is that you may have your calls returning fast a majority of the time but could have edge cases were the component renders faster than the side effect and it may have unhandled cases of undefined.

```typescript
// FROM
const [state, setState] = useState<Type[]>();

// TO
const [state, setState] = useState<Type[]>([]);
```

✅ **DO** identify generic parts of a component upfront that can be reused and code these generically enough to be shared.

✅ **DO** constrain what a user can enter in the UI to what the rest of the system can accept. For example, do not allow input that is larger than the database constraint, file uploads are larger than allowed in the backend. Validating such cases and showing specific and clean messages is a good UX practice.

✅ **DO** make use of TypeScript generics to expose typed props accordingly when you wrap around a component or accept a render component.

```typescript
export interface SampleComponentProps<T> {
  sampleProp: ComponentType<T> | ElementType;
}

export const SampleComponent = <T extends {}>(props: SampleComponentProps<T>) => {};

// based on usage, will infer the type of T and expose component props
<SampleComponent smampleProp={Input} />;
```

> ℹ The same principle should be applied to components that accept multiple data types. The inference of the type will add typing in places such as event handlers.

✅ **DO** ensure that the component file name is the same as the default export component.

✅ **DO** make use of CSS modules. Keep this consistent and in particular, do not make use of inline styles.

✅ **DO** favor functional components. They have a simpler syntax, no confusing lifecycle methods, constructors, or boilerplate and due to being succinct are more readable.

✅ **DO** favor multiple useEffect hook sections to make code more readable, over a single useEffect hook with multiple responsibilities.

> ℹ A good heuristic for this refactoring is when you have dependencies that do not apply to everything in the useEffect, for instance, you could have a dependency on an id changing but in addition to fetching an entity with that id you fetch data that would not have changed or be dependant on the id in the same hook. This is also applicable with custom hooks that wrap around useEffect,

✅ **DO** consider virtualizing long lists. Unvirtualized long lists can make for a very horrible user experience with performance in many cases.

✅ **DO** destructure props as consts at the top of the component to guard against accidental mutations.

```typescript
export const SampleComponent: FunctionComponent<SampleComponentProps> = memo((props) => {
    const { a, b, c, d } = props;
        ...
}
```

> ℹ️ An alternative is to create read-only props. This can prove challenging when considering nested properties and one would need to be careful about collection types used as well.

> ℹ️ In many scenarios knowing that something came from a prop vs say the state should not be a detail that should be exposed in the usage as many will justify `props.x` communicates this.

✅ **DO** mark state type properties as read-only accordingly to avoid direct mutations.

```typescript
interface ComponentState {
  userIds: number[];
  name: string;
  owner: User;
}

interface User {
  name;
}

export const Component: FunctionComponent<{}> = () => {
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

export const Component: FunctionComponent<{}> = () => {
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
export const Component: FunctionComponent<{}> = () => {
  const [state, setState] = useState<ComponentState>();

  setState(prevState => ({
    ...prevState,
    [field]: value,
  }));
};
```

✅ **DO** ensure that element keys are always stable, predictable, and unique. Unstable keys (like those produced by Math.random() or use of array indexes) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components. See [example](https://jsbin.com/wohima/edit?output).

✅ **DO** apply care when writing conditional renders on variables, use of falsie numbers will be rendered i.e. `value && <Component>` given 0 for value will render 0. This however works well with bools, null and undefined.

```typescript
// BAD
names.length && <Users names={names}>

// ALTERNATIVE
names.length > 0 && <Users names={names}>

// ALTERNATIVE
Boolean(names.length) && <Users names={names}>
```

✅ **DO** expose render component props from the wrapper when implementing the render props pattern. Best not to pick and expose as custom props upfront, usually exposing all makes for a flexible and un-opinionated render props wrapper.

✅ **DO** be mindful of the number of components that have state. If a value is not required for render it can be tracked without using state. Given a parent -> child hierarchy it may be possible to only track state at the parent.

✅ **DO** use correct import syntax (import 'x') if importing only for side effects.

```typescript
import '@testing-library/jest-dom/extend-expect';
```

✅ **DO** collocate things as close as possible to where they are being used.

> ℹ Keep components, functions, styles, state, etc. as close as possible to the component where it's being used. This will not only make your codebase more readable and easier to understand but it will also improve your application performance since it will reduce redundant re-renders on state updates.

✅ **DO** consider use of [`react-use`]([streamich/react-use: React Hooks — 👍 (github.com)](https://github.com/streamich/react-use)) over creating your own custom hooks where applicable.

✅ **DO** move any logic that is not React specific and does not need to be reinitialized on rerender out of function component. Keep in mind that the function component body is recalled on each render, calling that logic over and over unnecessarily.

⛔ **DO NOT** make all fields optional or add coalescing operators on something that is not nullable as a way to go around a state that can initially be null. Instead, make this explicit.

> ℹ By making this explicit anyone who updates this code later will know to handle null in the render.

⛔ **DO NOT** add to state or props data than can be derived/calculated from elsewhere.

⛔ **DO NOT** break HTML semantics with unnecessary elements like divs that do not carry the semantic meaning of divs for other reasons like a container in which case `Fragment` would have been better. Abuse of HTML tags can also break a11y and can result in an unnecessarily messy DOM.

⛔ **DO NOT** handle navigation with click event handling unless this is absolutely desired. The first prize is to make use of HTML semantics that the browsers have support for like hyperlinks/anchor tags. This will preserve expected browser behavior like center mouse click or right click open new tab giving the user more control, mouse icon change other current or future features.

⛔ **DO NOT** use React fully qualified name for types, i.e. `React.Fragment`, `React.FunctionComponent`. This is not necessary and in particular, is not used consistently, i.e. you may not find `React.useState` or `React.useEffect` in the same code base that uses the latter.

```typescript
const [user, setUser] = React.useState<User>({});

//instead
const [user, setUser] = useState<User>({});
```

⛔ **DO NOT** work around about state that can null in some cases, be explicit about. It will be easier for anyone using that state to know to handle possible nulls.

```typescript
// BAD
const [user, setUser] = useState<User>({});

// GOOD
const [user, setUser] = useState<User | null>({});
```

⛔ **DO AVOID** customizing 3rd party components via CSS. Instead, the customization should be done via props where applicable. Such customizations are not upgrade-friendly.

⛔ **DO AVOID** uncontrolled components, that is those that access the DOM directly i.e. refs unless absolutely necessary.

⛔ **DO AVOID** the urge to replace JSX with call-to-custom functions that return JSX, this should be done sparingly and with care. If this is desired then the custom function should be a component.

> ⚠ Note that splitting component renders with functions can be good but largely an anti-pattern that can hide the fact that a component has gotten too large or has multiple concerns. This approach should be highly avoided in favor of a declarative code. Certain React-specific heuristics are not applied when you use render functions, i.e. if you have a map and call a function React cannot and will not warn you about the need for a key and you can get away with passing unstable values like indexes to use as a key and again React cannot and will not warn you. Another really nasty thing that happens with such functions is that if you are using react dev tools, they will not show up.

⛔ **DO NOT** have constants scattered all over a component file. Neatly place all constants at the top of the component.

✅ **DO** create an order to how things flow in a component and stick to it consistently. For example, you could have the order state, hooks, event handlers, functions, and render body. Applying the same order in all your components makes it quick and easy to navigate around.

# Hooks

✅ **DO** follow the rules of hooks:

- Only Call Hooks at the Top Level
  > 🛑 Don’t call Hooks inside loops, conditions, or nested functions.
- Only Call Hooks from React Functions
  > 🛑 Don’t call Hooks from regular JavaScript functions. Instead, you can call Hooks from React function components or from custom Hooks

> ℹ These rules can and should be enforced with linting.

✅ **DO** name hooks with use prefix i.e. `useRestoreHook.

✅ **DO** consider creating custom hooks to encapsulate custom logic that is/can be duplicated in multiple places where applicable i.e. `useYourImagination`

⛔ **DO NOT** have hooks scattered all over a component file. Neatly place these at the top of the component.

> ℹ When reading through a component you will get the most out of immediately knowing its side effects and what it renders. Seeing hooks at the top and scrolling all the way down to see the render return makes this very easy. When hooks are scattered in between other methods like event handler that becomes harder.

⛔ **DO NOT** use complex objects as dependencies on the hooks

> You can read more on it [here](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/)

# Jest and React Testing Library

✅ **DO** group related tests under a `describe` if you have multiple tests in one file.

✅ **DO** locate the tests very close to the file being tested. For example, you could have the `_tests_` folder in each subfolder with something to test.

✅ **DO** name test files with suffix tests i.e. `userService.test.ts`, `breadCrumbs.test.tsx`

✅ **DO** favor data-driven tests with `test.each` over duplicated tests.

```typescript
test.each([
  [new Date(2000, 11, 12), false],
  [new Date(1970, 11, 12), false],
  [new Date(1969, 11, 12), true],
  [new Date(1950, 11, 12), true],
])('isDateBefore_1970 returns relevant boolean', (date: Date, expected: boolean) => {
  expect(isDateBefore_1970(date)).toBe(expected);
});
```

✅ **DO** favor naming tests in the format `given then should` or `given when then should`. Long test names are perfectly fine and in particular, the ability to use any characters including spaces in jest test names makes this very flexible.

✅ **DO** make it easy to tell apart the `Arrange`, `Act`, and `Assert` sections of your test and in particular to clearly tell what the system under test (`sut`) is.

✅ **DO NOT** have `magic values` in tests. Simple things like inlining variables to have a name can go a long way in test readability.

```typescript
// BAD - why is this value of significance?
expect(result.count).toBe(24);
```

✅ **DO** use the most specific assertions, these give the most specific and useful failure messages as well. If there is an assertion call for it, avoid the alternative of a more generic assertion with added logic in it.

⛔ **DO NOT** suppress linting rules, these are in place for a reason. Do consult other developers before suppressing rules, whether for specific code lines, files, or entire workspace

⛔ **DO NOT** write tests with multiple responsibilities, instead a test should have a single focus. Multiple unrelated assertions are a red flag.

⛔ **DO NOT** use `ReactTestUtils`. Use `React Testing Library` which is designed to enable and encourage writing tests that use your components as the end users would. `ReactTestUtils` has features like mocking elements, which do not simulate how a user would use the components and encourages very bad and brittle testing patterns.

# GOTCHAS

## Jest

✨ When setting up a mock with `jest.mock`, ideally you may want to set up one of the properties based on a variable so that you can use the same value in your assertions. Jest will however fail the test complaining that mocks cannot access outside variables. This is in place to avoid dirty mocks, however, you can bypass this by simply naming the variables with the `mock` suffix i.e. `mockUser`

```typescript
const mockUnknown = '#9E9E9E';

jest.mock('../../redux/store', () => ({
  getState: (): RecursivePartial<RootState> => ({
    app: {
      statusColors: {
        unknown: mockUnknown,
      },
    },
  }),
}));
```

## Form validation

✅ **DO** make use of yup schemas for validation and mutations related to forms.

✅ **DO** move the yup schema outside a component unless it requires access to something in a component, like a state (which can be avoided with a different design). This avoids a new schema being created on each render. Given the inner workings of yup on each mutation the schema is cloned, so an object schema composed of multiple property schemas is cloned for each, not ideal.

```typescript
// from this
const formSchema = object<User>({
  name: string().trim().required(customMessage()),
});

// to this
const formSchema = object<User>({
  name: string()
    .trim()
    .required(() => customMessage()),
});
```

⛔ **DO** not use the `shape` unless it is desired, ideally for merging multiple schemas together. This affects the Typescript type coercion and will fail to pick up mismatches in the schema to the target type.

```typescript
// from this
const formSchema = object<User>().shape({
    name: string()),
});

// to this
const formSchema = object<User>({
    name: string()),
});
```
