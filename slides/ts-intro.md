# Typescript
<img src="./images/typescript.png" width="600px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

---

# Quickstart
> The basic setup

https://github.com/Microsoft/TypeScript/wiki/Roadmap

----

## Install

Install

    npm install -g typescript

Compile

    tsc hello.ts        -> create hello.js file

Configure

    tsc --init          -> creates the tsconfig.json

    // tsconfig.json
    {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es5",
            "noImplicitAny": false,
            "sourceMap": false
        },
        "exclude": [
           "node_modules"
        ]
    }

https://www.typescriptlang.org/docs/handbook/compiler-options.html

----

## TypeScript in Node

Install

    npm install -g ts-node
    npm install -g typescript

File

    // script.ts
    var x = 'hello';
    x = 10;             // error

Run

    ts-node script.ts

Nodemon

    npm install ts-node typescript --save-dev
    nodemon --exec ./node_modules/.bin/ts-node -- ./script.ts

----

## Linting with TSLint

Install

```
    npm install tslint --save-dev
    npm install tslint-config-standard --save-dev
```

Config

```json
    // tslint.json
    {
        "extends": "tslint-config-standard"
    }
```

> See http://codelyzer.com/ for linting Angular projects

---

## ES6+ === Typescript
> The base of Typescript is ES6

----

### Start with javascript

- [Know Your Javascript](./know-your-javascript)
- [ES6 and Beyond](./es6-and-beyond)

> Make sure you know Javascript before starting with Typescript

----

### Roadmap / features

*** https://github.com/Microsoft/TypeScript/wiki/Roadmap ***

v2.1 (preferred or higher)

- Async/Await (ES7)
- Object spread operator (ES7)
- Untyped (implicit-any) imports

v2.0

- Trailing Commas in Function Param Lists (ES7)
- @types support (previously tsc & typings)
- Non-nullable types

> Don't use Typescript 1.x anymore

----

### Classes

ES6

```
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

Typescript

```js

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

Typescript (short syntax)

```js
class Person {
    constructor(private name: string) {
    }

    sayName() {
        console.log(`my name is: ${this.name}`)
    }
}
```

---

## TypeScript Type System
> TypeScript is javascript + typings

----

### Basic Annotations

The following example demonstrates type annotations can be used for variables, function parameters and function return values.

    var num: number = 123;
    function identity(num: number): number {
        return num;
    }

----

### Simple Types

The JavaScript primitive types are well represented in the TypeScript type system. This means string, number, boolean as demonstrated below:

```
    var num: number;
    var str: string;
    var bool: boolean;
    var stringArray: string[];
    var power: any;

    num = 123;
    num = 123.456;
    num = '123'; // Error
```

```
    str = '123';
    str = 123; // Error

    power = '123';
    power = 123;

    bool = true;
    bool = false;
    bool = 'false'; // Error

    stringArray = ['123', '456']
```

----

### Interfaces

    interface Name {
        first: string;
        second: string;
    }

    var name: Name;
    name = {
        first: 'John',
        second: 'Doe'
    };

or

    var name: Name = {
        first: 'John',
        second: 'Doe'
    };

----

### Special types

```js
    // Use :void to signify that a function does not have a return type.
    function log(message): void {
        ...
    }

    // Union Type: one of multiple types
    function formatCommandline(command: string[]|string) {
        ...
    }

    // Generics: Like in C#
    function reverse<T>(items: T[]): T[] {
        ...
    }
```

----

### 3th party libraries types

Try to use 3th party libraries

```bash
#install moment & clone modules
npm install clone moment --save
```

And use it

    import * as clone from 'clone'
    import * as moment from 'moment'

Notice we have autocompletion on `moment` but not with `clone`

<img src="./images/autocomplete.png">

----

### Typing files

Moment provide typing files: `moment.d.ts`. Contains all types provided by `moment.js`

    ./node_modules/moment/moment.d.ts

`Clone` doesn't provide these, but we can install them separately

    npm install @types/clone --save-dev

Now you have the full type information available. See also: http://microsoft.github.io/TypeSearch/

> Before Typescript 2.1 typing where always required!

----

### Define your own typings

declarations.d.ts

```js
    // modules without @types (not required anymore on TS 2.1+)
    declare module 'uuid-js';
    declare module 'invariant';
```

```js
    // enumify
    declare module 'enumify' {
        class Enum {
            public static enumValueOf(any): Enum;
            public static initEnum(any): any;
            public static enumValues: any;

            public name: string
        }
    }
```

```
    // the global window
    interface Window {
        fetch:(url: string, options?: {}) => Promise<any>
        process: any
    }
```

---

# Resources

- [Rangle.IO Typescript](https://angular-2-training-book.rangle.io/handout/features/typescript.html)
