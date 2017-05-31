# Angular Unit Testing
<img src="./images/testing.jpeg" width="400px" /><br>
<small>by Peter Cosemans</small>

<br>
<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 700px;
    word-wrap: normal;
}
</style>

---

# What do I need?

> There are so many frameworks & libraries

----

## Setups

* Browser
    - [Karma](https://karma-runner.github.io/1.0/index.html) with [Jasmine](https://jasmine.github.io/) or [Mocha](https://mochajs.org/]) & [Chai](http://chaijs.com/)

* Node (through [jsdom](https://github.com/tmpvar/jsdom))
    * [Jest](https://facebook.github.io/jest/)

* Integrated
    * [Angular-CLI](https://github.com/angular/angular-cli) (Karma/Jasmine)

* End-to-end
    * [Protractor](http://www.protractortest.org/#/) (Angular)
    * Selenium

* Mocking Libraries
    - [Jasmine](https://jasmine.github.io/)
    - [Jest](https://facebook.github.io/jest/)
    - [Sinon.JS](http://sinonjs.org/)
    - [testdouble.js](https://github.com/testdouble/testdouble.js)

---

# Karma
> The default test runner of @Angular/cli

----

## Karma & Jasmine

@Angular/cli

Standard provided by @Angular/cli and ready to use.

- Runs test via karma/jasmine in Chrome
- Runs coverage via istanbul
- Transpiles and bundles via webpack
- Auto watch on file changes
- Configuration: karma.config.js

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function (config) {
  config.set({
     ...
  })
}
```

----

## Sample test

```js
describe('my first test', () => {
    it('should work', () => {
        expect(true).toEqual(true)
    })
})
```

----

## Run

```bash
$ ng test
WARN [karma]: No captured browser, open http://localhost:9876/
INFO [karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
INFO [launcher]: Launching browser Chrome with unlimited concurrency
INFO [launcher]: Starting browser Chrome
INFO [Chrome 57.0.2987 (Mac OS X 10.11.6)]: Connected on socket LdLTZc_QYLowy4ubAAAA with id 44585936
Chrome 57.0.2987 (Mac OS X 10.11.6): Executed 4 of 4 SUCCESS (0.176 secs / 0.16 secs)
```

> Any file change will trigger test run

----

## Setup and teardown

```js
describe('my first test', () => {
    beforeEach(() => {
        // setup before each test
    })

    afterEach(() => {
        // cleanup after each
    })

    it('should ...', () => {
        ...
    })
})
```

---

# Jest

> Delightful JavaScript Testing

----

## Why Jest

* Build by facebook
* All in one (runner, test framework, assertion & mocking)
* Easy to get started and powerfull to extend
* Instant and user friendly feedback
* It's fast!
* Out of the box support for (no config):
    - Babel (ES6+)
    - JSDom (no browser)
    - Code coverage
    - Promises and async testing
    - Standard Jasmine Assertion matchers
    - Mock by default
* Watch support for
    - All files: *.spec.js, *.test.js
    - Regex Patterns
    - Only changed files (including git file status)
* Can be used in projects that use webpack to manage assets
* Can be used for NodeJS, ReactJS, [Angular](https://www.xfive.co/blog/testing-angular-faster-jest/) & [VueJS](https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186)

----

## Setup Jest for Angular

Make sure you remove all karma stuff from @angular/cli

<small>
Remove all karma related modules (karma, karma-cli, ...)<br>
Remove all jasmine related modules (jasmine-core, @types/jasmine, ...)<br>
Remove karma.config.js ls<br>
Remove all karma related config from .angular-cli.json<br>
</small>

Add jest and dependencies

```bash
yarn add jest jest-preset-angular @types/jest --dev
```

Add jest config to package.json

```json
"jest": {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
}
```

Create ```setupJest.ts```

```js
import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
```

See [TESTING ANGULAR FASTER WITH JEST](https://www.xfive.co/blog/testing-angular-faster-jest/)


----

## Run

Configure package.json

```json
"scripts": {
    "test": "jest --watch",
    "test:ci": "jest --runInBand"
}
```

```bash
yarn test:ci v0.24.6
$ jest
 PASS  src/app/app.component.spec.ts
  AppComponent
    ✓ should create the app (127ms)
    ✓ should have as title 'app works!' (33ms)
    ✓ should render title in a h1 tag (29ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.071s
Ran all test suites.
✨  Done in 2.58s.
```

----

## vscode-jest

![vscode-jest](https://github.com/orta/vscode-jest/raw/master/images/vscode-jest.gif)

---

# Unit Testing

> Lets test your code

----

## Basic test

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

----

## Using Matchers

```js
// basic matchers
expect(2 + 2).toBe(4);                      // ===
expect(data).toEqual({one: 1, two: 2});     // check every property
expect(x).toBeNull();
expect(x).toBeDefined();
expect(x).toBeFalsy();
expect(x).toBeTruthy();

// not
expect(2 + 2).not.toBe(5);
expect(x).not.toBeNull();

// numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(4.5);
expect(doubleValue).toBeCloseTo(0.3);

// strings and arrays
expect('Christoph').toMatch(/stop/);
expect(['beer', 'kleenex']).toContain('beer');

// exceptions
expect(fn).toThrow();
expect(fn).toThrow(ConfigError);
expect(fn).toThrow('you are using the wrong JDK');
expect(fn).toThrow(/JDK/);
expect(() => testMe(arg)).toThrow();
```

----

## Organizing

Grouping

```js
describe('myCalculator', () => {
    test('add ...', () => {
        ...
    })
    test('substract ...', () => {
        ...
    })
})
```

Setup and teardown

```js
beforeEach(() => {
    // setup before each test
})

afterEach(() => {
    // cleanup after each
})

test('this has ...', () => {
    ...
})
```

----

## Async test

```js
// myService.spec.js
import { find } from './myService'

describe('test', () => {
    it ('should work', () => {
        // return the promise makes the test wait until it resolved (or fails)
        return find('query')
            .then(data => {
                expect(data).toEqual('abc')
            })
        })
    });
});
```

> This doesn't work in Jasmine

----

## Mock Functions

Create a mock function

```js
// create the mock
const myMock = jest.fn();

// you can call the function
myMock('1');

// and verify it was called correctly
expect(myMock).toHaveBeenCalled();
expect(myMock).toHaveBeenCalledWith('1');
expect(myMock.mock.calls.length).toBeGreaterThan(0);
expect(myMock.mock.calls[0][0]).toBe('1');   // first call, first argument
```

A mock function returning a value

```js
// create the mock function that returns 100
const myMock = jest.fn().mockReturnValue(100)

// you can call the function
const result = myMock();

// and verify it was called correctly
expect(myMock).toHaveBeenCalledTimes(1)
expect(result).toBe(100);
```

With custom implementation

```js
// throw an error
jest.fn().mockImplementation(() => { throw new Error('bad') })
```

----

## Jest vs Karma/Jasmine

```js
// mocked function
jest.fn()
jasmine.createSpy('name')

// mocked function with return
jest.fn().mockReturnValue(2)
jasmine.createSpy('name').and.returnValue(2)

jest.spyOn(foo, 'setBar').mockImplementation(() => { throw new Error('bad') })
spyOn(foo, 'setBar').and.callFake(() => { throw new Error('bad') })
```

Jasmine: [http://ricostacruz.com/cheatsheets/jasmine.html](http://ricostacruz.com/cheatsheets/jasmine.html)

---

# Angular Unit testing

> More then just unit testing

----

## Start with

Start testing with

1. Plain old JS code: functions, classes, ...
2. Pipes
3. Services
4. RouteGuards
5. RouteResolvers
6. Services with http
.
.
10. Components (but first extract most logic into service or POJ)

----

## Test Pipes

The pipe

```js
import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
    transform(value){
        return value.toUpperCase()
    }
}
```

The test

```js
import { CapitalisePipe } from './capitalisePipe'

describe('Pipe: CapitalisePipe', () => {
    let pipe
    beforeEach(() => {
        pipe = new CapitalisePipe()
    }))

    it('should throw if not used with a string', () => {
        expect(pipe.transform('hello')).toEqual('HELLO')
        //must use arrow function for expect to capture exception
        expect(() => pipe.transform(undefined)).toThrow()
    })
})
```

> It is just a JS class

----

## Using Dependency Injection

Test

```ts
import { TestBed, inject } from '@angular/core/testing'
import { Engine } from './engine'
import { Car } from './car'

describe('Car', () => {
    let subject: Car
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Engine, Car]
        });
    });

    beforeEach(inject([Car], (car: Car) => {
        subject = ca
    }));

    it('should display name with engine', () => {
        expect(subject.getName()).toEqual('Car with Basic engine(150 HP)')
    })
})
```

alternative you can use

```ts
it('should display name with engine', inject([Car], (car: Car) => {
    expect(car.getName()).toEqual('Car with Basic engine(150 HP)')
}))
```

----

## Spy and mocks

```ts
...
beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [Engine, Car]
    });
    jest.spyOn(Engine.prototype, 'getHorsePower').mockReturnValue(400)
    jest.spyOn(Engine.prototype, 'getName').mockReturnValue('V8 engine')
})

afterEach(() => {
    jest.resetAllMocks()
})

it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with V8 engine(400 HP)');
})
```

----

## Async

```js
import { TestBed, inject, async } from '@angular/core/testing'

...

it('should...', async(inject([AClass], (object) => {
    object.doSomething.subscribe((result) => {
        expect(result).toEqual(....);
    })
})));
```

The test will wait until all asynchronous calls within this zone are done. This works with promises and observables.

----

## Http testing

Doing it the hard way

```ts
describe('Blog Service', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                BlogService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                HttpModule
            ]
        })
    }))

    it('should fetch blog entry by a key', async(() => {
        let blogService: BlogService = getTestBed().get(BlogService)
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toMatch(/\/server\/api\/blogs\/3/)
            connection.mockRespond(new Response(
                new ResponseOptions({
                    body: {
                        contentRendered: '<p><b>Demo</b></p>',
                        contentMarkdown: '*Demo*'
                    }
                }))
            )
        })

        blogService.getBlog(3).subscribe(
            (blogEntry) => {
                expect(blogEntry.contentMarkdown).to.equal('*Demo*')
                expect(blogEntry.contentRendered).to.equal('<p><b>Demo</b></p>')
            }
        )
    }))
})
```

----

## Http testing (easy way)

```ts
import { FakeBackend } from 'ngx-http-test'   // <- helper util
describe('Blog Service', () => {
    let server : FakeBackend
    let blogService : BlogService
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BlogService,
                FakeBackend.getProviders()
            ],
        })
    })

    beforeEach(inject([BlogService, FakeBackend], (blogService, fakeBackend) =>  {
        this.backend = fakeBackend
        this.blogService = blogService
    }))

    afterEach(inject(() => {
        this.backend.verifyNoPendingRequests()
        this.backend.verifyNoPendingExpectations()
    }))
```
```js
    it('should fetch blog entry by a key', async(() => {
        this.backend.expectGET('server/api/3').respond({
            contentRendered: '<p><b>Demo</b></p>',
            contentMarkdown: '*Demo*'
        })
        blogService.getBlog(3)
            .subscribe((blogEntry) => {
                expect(blogEntry.contentMarkdown).toEqual('*Demo*')
                expect(blogEntry.contentRendered).toEqual('<p><b>Demo</b></p>')
            })
    }))
})
```

----

## Component testing

```js
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AppComponent } from './app.component'

describe('AppComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [AppComponent]
        })
    })

    it('should display 0 as initial value', () => {
        // on the testBed we can create the component
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        // and query element with 'By-class'
        const h2 = fixture.debugElement.query(By.css('h2'))
        // assert
        expect(h2.nativeElement.textContent).toEqual('Value: 0')
    })

})
```

----

## Component testing

Interact with the component

```js
// create component
const fixture = TestBed.createComponent(AppComponent)

// spy on a method
const onClick = sinon.spy(fixture.componentInstance, 'onIncrementClick')

// call method on the component
fixture.componentInstance.onIncrementClick()
fixture.detectChanges()

// trigger event on dom element
const button = fixture.debugElement.query(By.css('.increment'))
button.triggerEventHandler('click', {})
expect(onIncrementClick.called).toEqual(true)
```

> Remember the component based testing is slow and hard to do.

---

# Resources

- [https://www.xfive.co/blog/testing-angular-faster-jest/](https://www.xfive.co/blog/testing-angular-faster-jest/)
- [Angular CLI with Jest](https://github.com/angular/angular-cli/issues/4543)
