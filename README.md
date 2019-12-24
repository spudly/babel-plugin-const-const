# @spudly/babel-plugin-const-const

A babel plugin that transforms all `const` declarations, wrapping the
initilization expression with `deepfreeze()` to make it immutable (which is
apparently what lots of people think `const` already does.

**Disclaimer: This is almost certainly a terrible idea; I created this as a
joke! That said, it does work so if you think it's useful, feel free to use
it.**

## Example

Input:

```js
let a = {
  a: 'A',
};

const b = {
  b: 'B',
};
```

Output:

```js
import deepfreeze from 'deepfreeze';

let a = {
  a: 'A',
};

const b = deepfreeze({
  b: 'B',
});
```

## Install

Using npm:

```sh
npm install --save-dev @spudly/babel-plugin-const-const
```

or using yarn:

```sh
yarn add @spudly/babel-plugin-const-const
```
