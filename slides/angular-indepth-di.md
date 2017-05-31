# Angular - Dependency Injection
<img src="./images/angularjs-dependency-injection.jpg" width="600px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal p {
    text-align: center;
    margin: 20px 0;
    line-height: 1.0;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>

---

# Dependency Injection

> Inject those dependencies

----

## What is dependency injection

Dependency injection is a software design pattern that implements inversion of control for resolving dependencies. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.

[Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)

----

## Injector & Providers

The ***'Injector'*** is a service that keeps track of the injectable components by maintaining a registry and injects them when needed.

A ***'Provider'*** is like a recipe that tells the 'injector' how to create an instance of a dependency. Angular offers us the following type of providers:

- Class Provider (useClass)
- FactoryProvider (useFactory)
- Aliased Class Provider (useExisting)
- Value Provider (useValue)

To register a provider:

```js
@NgModule({
    ...
    providers: [
        {
            provide: CarService,        // token
            useClass: CustomCarService, // useClass, useValue, useExisting, useFactory
            deps: [Http],               // dependencies
        }
    ],
})
```

----

## OK, back to basics

```js
import {Injectable} from 'angular2/core'

@Injectable()
export class CarService {
    getCars = () => [
       { id: 1, name: 'BMW' },
       { id: 2, name: 'Suzuki' },
       { id: 3, name: 'Volkswagen' }
    ]
}
```

> @Injectable: Is a decorator, that informs Angular that the service has some dependencies itself.

... and in our component we consume the service (dependencies):

```js
import { CarService } from './carService'
@Component({
    ...
})
class AppComponent {
    constructor(private carService: CarService) {
    }

    ngOnInit() {
        this.carService.getCars()
    }
}
```

Or get a dependency from the injector

```js
constructor(injector: Injector) {
    const config = injector.get(CarService);
}
```

----

## Registration

Global

```js
@NgModule({
    ...
    providers: [
        {
            provide: CarService,        // token (any be anything)
            useClass: CarService,       // class to instanciate
        }
    ],
})
```

Per component

```js
@Component({
    ...
    providers: [
       { provide: CarService, useClass: CarService }
    ]
})
export class AppComponent { }
```

For 'useClass' there is a shorthand version

```js
providers: [
    CarService
],
```

----

## Dependency injection tokens

@Inject: Is a decorator, that informs the Injector to inject a dependency based on the token.

```js
import { Inject } from 'angular2/core'

// JavaScript: @inject decorator
// to inject the service associated with that CarService class token
constructor(@Inject(CarService) carService) {
    this.cars = _carService.getCars()
}
```

In TypeScript there is no need for the @Inject decorator

```js
// TypeScript: type anotation to define provider
constructor(private _carService: CarService) {
    this.cars = _carService.getCars()
}
```

----

## FactoryProvider (useFactory)

We can take control over the instanciating

```js
const IS_PROD = true
...
providers: [
    {
        provide: CarService,
        useFactory: (http) => {
            return IS_PROD ? new FakeCarService() : new CarService(http)
        },
        // we have to specify the dependency ourself when
        // using the useFactory (see http above)
        deps: [Http],
    }
],
```

----

## Value Provider (useValue)

To register a value in the 'Injector'

```js
providers: [
    {
        provide: 'config',
        useValue: {
            baseUrl: 'http:/domain/api',
        }
    }
],

// use
constructor(@Inject('config') config) {
    ...
}
```

----

## Value Provider - InjectionToken

Better to use type safe InjectionToken (Angular2: OpaqueToken)

```ts
interface AppConfig {
    baseUrl: string
}

const appConfig: AppConfig = {
    baseUrl: 'http:/domain/api'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config')
providers: [
    {
        provide: APP_CONFIG,
        useValue: AppConfig
    }
]

// use
constructor(@Inject(APP_CONFIG) config: AppConfig) {
    ...
}
```

----

## An example - extend http

```js
import {
  Http,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs,
  Request,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('request...');
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('get...');
    return super.get(url, options);
  }
}
```

and register it as described below

```js
@NgModule({
    ...
    providers: [
        {
            provide: Http,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new CustomHttp(backend, options)
            },
            deps: [XHRBackend, RequestOptions],
        }
    ],
})
```

See: [http://www.adonespitogo.com/articles/angular-2-extending-http-provider/](http://www.adonespitogo.com/articles/angular-2-extending-http-provider/)
