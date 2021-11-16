---
title: "Creating TypeScript type guards with Yup"
date: 2021-11-15T09:24:35-06:00
publishDate: 2021-11-15
summary:
  "The Yup schema builder and validation library can be used to create powerful
  type guards in TypeScript, and I will show you how!"
---

## Type guards

In TypeScript, a
[type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) is a
way to narrow the type of a value. TypeScript has many of these built in to the
language. For example:

```ts
// doSomething takes a single parameter that is either a string or a number.
function doSomething(x: string | number) {
  // ⬇ This is a type guard that narrows the type of x to only a string.
  if (typeof x === "string") {
    return x.toUpperCase();
  }

  // Since the conditional block always returns, the type of x here is narrowed
  // to only a number.
  return x.toPrecision(2);
}
```

You can also define your own type guard by implementing a function whose return
type is a
[_type predicate_](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
The example from the TypeScript documentation is a good one:

```ts
// This is our custom type guard. It takes an argument that is either a Fish or
// a Bird and reports whether that argument can be narrowed to the Fish type.
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

Using a user-defined type guard works the same as any other type guard.

```ts
// pet has the type Fish | Bird.
let pet = getSmallPet();

if (isFish(pet)) {
  // The isFish type guard narrows the type of pet to only a Fish in this block.
  pet.swim();
} else {
  // Same as before, the opposite narrowing also happens here.
  pet.fly();
}
```

## Yup schemas

[Yup](https://github.com/jquense/yup) is a JavaScript library for creating data
schemas that can be used to parse and validate values. You can define the shape
of an object using a functional programming style API. Here is an example from
their home page:

```js
import * as yup from "yup";

let userSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
```

This creates a schema for an object that defines a user. Yup schemas have
methods that can, among other things, validate whether an object satisfies the
schema. For example:

```js
userSchema.isValidSync({
  name: "Sam Eagle",
  age: 47,
  email: "seagle@example.com",
  createdOn: new Date("1974-12-10"),
}); // true

userSchema.isValidSync({
  something: "foo",
  notAName: "bar",
}); // false
```

## Putting them together

Here is our task: we have some data that has the union type
<code>User&nbsp;|&nbsp;Admin</code>, and we want to greet them differently
depending on the type of `data`.

```ts
const data: User | Admin = getPersona();

if (isUser(data)) {
  console.log(`Hello, ${data.name}!`);
} else {
  console.log(`Welcome, ${data.salutation} ${data.lastName}.`);
}
```

Our goal is to implement the type guard `isUser` with the following
requirements:

- The `User` type is already defined (either by us or importing from elsewhere).
- The validation is performed by a Yup schema.
- TypeScript enforces that the Yup schema correctly validates a `User` type.

Here we go!

First, suppose this is the definition of a `User`:

```ts
interface User {
  name: string;
  age: number;
  email?: string;
  website?: string;
  createdOn: Date;
}
```

We will reuse our `userSchema` from before, but this time we will add a type
annotation to it.

```diff
- const userSchema = yup.object().shape({
+ const userSchema: yup.SchemaOf<User> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
```

By adding the type assertion for `yup.SchemaOf<User>`, we will now have
assurance that the schema definition agrees with our type definition. To see
this in action, try removing one of the properties.

```ts
// ERROR: Property 'website' is missing in type '...'
const userSchema: yup.SchemaOf<User> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
```

Be warned: the Yup schema can be _more_ strict than the type it's meant to check
for, such as requiring more properties on the object. It has to be able to do
this (there is no TypeScript type for "positive integer"). What you are
guaranteed is that it will check _at least_ for the types you pass in.

Now, this is already pretty good, and calling `userSchema.isValidSync(data)`
_will_ narrow the type of `data`. However, it's not quite perfect—the `else`
branch is not narrowed!

```ts
const data: User | Admin = getPersona();

if (isUser(data)) {
  console.log(`Hello, ${data.name}!`);
} else {
  // ERROR: Property 'salutation' does not exist on type 'User'.
  console.log(`Welcome, ${data.salutation} ${data.lastName}.`);
}
```

Looking at the
[source code for `isValidSync`](https://github.com/jquense/yup/blob/94cfd11b3f23e10f731efac05c5525829d10ded1/src/schema.ts?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L461-L464),
we can see why this happens. The `isValidSync` method is a type guard for a
different type: `yup.Asserts<User>`, which is
[assignable](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
to our `User` type (hence why the `if` branch passes the type checker), but it
is not our `User` type. This means that in the `else` branch, the type of `data`
is still `User | Admin`.

To get around this, we still need to define our own type guard. Thankfully, all
of the hard work has been done for us by Yup.

```ts
function isUser(value: unknown): value is User {
  return userSchema.isValidSync(value);
}
```

That's it! Now our original example works. Here we put it all together:

```ts
import * as yup from "yup";

import type { User } from "./types";
import { getPersona } from "./persona";

const userSchema: yup.SchemaOf<User> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

function isUser(value: unknown): value is User {
  return userSchema.isValidSync(value);
}

const data: User | Admin = getPersona();

if (isUser(data)) {
  console.log(`Hello, ${data.name}!`);
} else {
  console.log(`Welcome, ${data.salutation} ${data.lastName}.`);
}
```
