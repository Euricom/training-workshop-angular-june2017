# Angular - RXJS
<img src="./images/ngrx.png" width="400px" /><br>
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

---

## The correct way of importing RxJS

Don't import the complete library

```js
import Rx from "rxjs/Rx"
import "rxjs"
```

Only import what you need

```js
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
```

Best to bundle common rxjs extensions in separate file

```js
// rxjs-extension.ts
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
```

> Again, don't import the complete rxjs library! It's very big!

## Route Events

router events

```js
export class AppComponent {
    private sub: any;
    constructor(private router: Router) {}
    ngOnInit() {
        this.sub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event) => {
                console.log('NavigationEnd:', event);
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

<small>
See also: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
</small>

route params changed

```js
export class MyComponent {
    private sub: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        // call getContact when route params changes
        this.sub = this.route.params            // params is an observable
            .map(params => params['id'])
            .switchMap(id => this.contactsService.getContact(id))
            .subscribe(contact => this.contact = contact);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

See also: params, queryParams, fragment, data, url

---

## Form valueChanges

Handle control changes (valueChanges, statusChanges)

```html
<!-- single control form -->
<input type="text" [formControl]="searchControl">
```

```js
export class AppComponent {
    loading: Boolean;
    searchControl = new FormControl();
    ngOnInit() {
        // call search when input changes (different value)
        // and not more the every 400ms
        this.sub = this.searchControl.valueChanges
            .debounceTime(400)          // wait for 400ms
            .distinctUntilChanged()     // value must change
            .do( () => this.loading = true)
            .switchMap(term => this.wikipediaService.search(term))
            .do( () => this.loading = false)
            .subscribe(items => this.items = items)
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

Handle form changes

```js
    this.userForm.valueChanges
        .subscribe(form => {
            sessionStorage.setItem('form', JSON.stringify(form));
        });
```

---

## Async Pipe

```js
import { Observable } from 'rxjs/Observable'
import { Task } from './models/task'
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks$: Observable<Task[]>
    constructor(private taskService: TaskService) {
    }

    getData() {
        this.tasks$ = this.taskService.getTasks()
            // additional log
            .do(() => console.log('got data'))
            // additional error handling
            .catch(error => {
                console.log('have error', error);
                return Observable.of([])
            })

        // don't do a unsubscribe here, the async pipe unsubscribes automatically!
    }
}

```

In the template: async

```html
<ul>
    <li *ngFor="let task of tasks$ | async">
        {{task.name}} - {{task.completed}}
    </li>
</ul>
```

---

# Practical Use RxJS
> Usefull examples of RxJS in Angular apps

----

## EventAggregator

```js
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';

export class Event {
  type: String;
  data: any;
}

@Injectable()
export class EventAggregator {
  subject: Subject<Event>;

  constructor() {
    this.subject = new Subject<Event>();
  }

  publish(type: String, data: any) {
    this.subject.next({ type, data });
  }

  listen(type: String) {
    return this.subject
      .filter((event) => event.type === type)
      .map(event => event.data)
      .share();
  }

  unsubscribe() {
    this.subject.unsubscribe();
  }
}

```

----

## EventAggregator - Use

```js
export class MyService {
    constructor(private eventAggregator: EventAggregator) {
    }

    doAction() {
        this.eventAggregator.publish('error', { type: 'xxx', message: 'test'})
    }
}
```

```js
export class AppComponent {
    constructor(private eventAggregator: EventAggregator) {
    }

    ngOnInit() {
        this.eventAggregator.listen('error')
            .subscribe(error => {
                console.error(error.message);
            })
    }
}
```

----

## Caching data

```js
@Injectable()
export class BooksService {
    private bookKinds:Book[];

    constructor(private http: Http) {}

    getBookKinds(): Observable<Book[]> {
        if (this.book) {
            return Observable.of(this.bookKinds);
        }
        return this.http.get('/books')
            .map(res => res.json())
            .do(result => {
                this.bookKinds = result;
            })
    }
}
```

<small>
Observable Data Services: https://github.com/jhades/angular2-rxjs-observable-data-services
</small>

----

## AppStore

NgRx is based on this

```js
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export class AppStore {
    constructor() {
        // Bhavior subject keeps the last value and returns it upon subscription.
        this.store = new BehaviorSubject()
        this.changes$ = store.asObservable()
            .distinctUntilChanged()
            .do(changes => console.log('new state', changes))
    }

    setState(state: State) {
        // will trigger all subscriptions to this.changes
        this.store.next(state)
    }

    getState() {
        return this.store.value
    }
}

// use
const appStore = new AppStore()
appStore.changes$
    .subscribe(state => {
        console.log('state changes:', state)
    })

// other place in your code
appStore.setState({
    name: 'admin'
})
```
