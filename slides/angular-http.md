# Angular - Http
<img src="./images/http_observables.png" width="600px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>

----

# Basic use
> Keep it simple

----

## Setup

- Install @angular/http ```yarn add @angular/http```
- Register HttpModule

```js
import { HttpModule } from '@angular/http'

@NgModule({
    ...
    imports: [
        ...
        HttpModule
    ]
    ...
})
```

> AngularCLI will set this up for you :)

Use

```js
import { Http } from '@angular/http'

export class MyComponent {
    tasks: any;
    constructor(private http: Http) {
        this.tasks = [];
    }
    ngOnInit() {
        this.http.get('tasks.json')
            .map(res => res.json())
            .subscribe(result => {
                this.tasks = result;
            });
    }
}
```

---

# Keep the code clean
> The right way of using the http service

----

## Single Responsibility!
### Split component and service

```js
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

export class TaskService {
    constructor(private http: Http) {}
    getTasks() {
        return this.http.get('tasks.json')
            .map(res => res.json())
    }
}
```

```js
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks = [];
    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}

```

----

## Typed response

```js
// ./models/taskModel.ts
export class Task {
    constructor(
        public id: Number,
        public desc: String,
        public completed:Boolean) { }
}
```

```js
// ./services/taskService.ts
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.ts';

getTasks() : Observable<Task[]> {
    return this.http.get('tasks.json')
        .map((res: Response)) => res.json())
}
```

```js
import { Task } from '../models/task.ts';
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks: Task[] = [];
    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}
```

---

# Error handling
> Don't forget those failures

----

## Handle http error

```js
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

export class CustomerService {
    constructor(private http: Http) {}
    getAll() Observable<Customer> {
        return this.http.get('api/customers')
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    handleError(error: Response | any) {
        if (error instanceOf Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch(error) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Communication Error')
    }
}
```

----

## Handle http error

```js
// my.component.ts
this.customerService.getAll()
    .subscribe(
        // first function is result
        customers => this.getAll = getAll,
        // second function is error
        error => this.errorMessage = error,
    );
```

----

## Retry and timeout

```js
getUsers(): Observable<User[]> {
  return this.http.get('api/users')
      .retryWhen(error => error.delay(500))
      .timeout(2000, new Error('delay exceeded'))
      .map(res => res.map())
}

```

Advanced version

```js
http.get('api/users')
    .map(res => res.json())
    .let(handleRetryAndTimeout(2, 500, 2000))
    .catch(error => castError(error))

function handleRetryAndTimeout(retry, retryTime, timeout) {
    return (obs) => {
      return obs.timeout(timeout)
        .retryWhen(errors => {
          return errors
            .scan((retryCount, err) => {
              // only retry on socket error, not on http error
              if (!err.status && retryCount < retry) {
                return retryCount + 1;
              }
              throw err;
            }, 0)
            .delay(retryTime);
        })
        .catch(castError);
    }
}
```
```js
function castError(error: Response | any): Observable<string> {
  if (error instanceof Response && error.status > 0) {
    const errMessage = 'Response Error: ' + error.statusText;
    return Observable.throw(errMessage);
  }
  if (error.name === 'TimeoutError') {
    return Observable.throw('Server is not responding');
  }
  return Observable.throw('No Internet');
}
```

---

# Advanced use
> Let RxJS work for you

----

## Wait for multiple http calls

```js
const users$ = http.get('api/users').map(res => res.json())
const customers$ = http.get('api/customers').map(res => res.json())
Observable.forkJoin([users$, customers$])
    .subscribe(([users, customers]) => {
        console.log(users)
        console.log(customers)
    })
```

## A change (observable) triggers a http call

```js
    Rx.Observable.fromEvent(button, 'click')
        // log current value of the stream
        .do(val => console.log(val))
        // switchMap: cancels previous and switch over to http call
        .switchMap(http.get('api/users'))
        .map(res -> res.json()))
        .subscribe(users => cosole.log('users', users))
```

---

# Debug Setup
> Accessing the API server

----

## Setup angular-cli proxy

proxy.config.json

```json
{
  "/api/*": {
    "target": "http://localhost:3000",
  }
}
```

package.json

```json
"scripts": {
    "serve": "ng serve --proxy-config proxy.config.json",
    ...
}
```

