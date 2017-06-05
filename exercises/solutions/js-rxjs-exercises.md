Subscribe on a button click

```js
const btn = document.querySelector('#btn')
Rx.Observable.fromEvent(btn, 'click')
  .subscribe(x => console.log(x))
```

Create a stream of a single element with type string

```js
const string$ = document.of('This is a mesage')
```

Create a subscription that fires once, if you hover over a text element

```js
const stream$ = Rx.Observable.fromEvent(btn, 'mousemove')
stream$.take(1).subscribe(x => console.log(x))
```

Count the number of elements in a array (with an observable stream)

```js
const array$ = Rx.Observable.from([1,2,3,4])
array$.count()
    .subscribe(x => console.log(x))
```

Count the number of click events on a button

```js
const clicks$ = Rx.Observable.fromEvent(btn, 'click')
    .scan(0 /* start with 0 */, (acc, event) => {
        return acc = acc + 1;
    })
    .subscribe(x => console.log(x))
```

Create a count down timer in seconds (10 - 0)

```js
Rx.Observable
    .interval(500)
    .map(x => 10 - x)
    .take(10)
    .subscribe(x => {
        console.log(x)
    })
```

Create a observable stream of an input box value change

```js
const input = document.querySelector('#input')
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')
inputStream$.map(x => x.target.value)
    .filter(x => x.length > 2)
    .debounceTime(500)
    .map(x => x.toUpperCase())
    .subscribe(x => console.log(x))
```

Create a subscription on a button click that auto unsubscribe after 5 seconds

```js
const 5sec$ = Rx.Observable.timeout(1000);
const btn = document.querySelector('#btn')
Rx.Observable.fromEvent(btn, 'click')
  .takeUntil(5sec$)
  .subscribe(x => console.log(x))
```

    ---c--c---c------c----c-----
    ----------------0|
    ---c--c---c-----|

## Create your own observable

```js
function createFromButtonClick(btnSelector) {
    const btn = document.getElementById(btnSelector);
    return Rx.Observable.create(observer => {
        function onClick(event) {
            observer.next(event)
        }
        btn.addEventListener("click", onClick);
        return () => {
            btn.removeEventListener("click", onClick);
        }
    })
}

// use
const stream$ = createFromButtonClick('btn');
const sub = stream$
    .subscribe(result => console.log(result));
```

## Combine observables

### Cleanup following code

```js
const userData$ = Rx.Observable.ajax({
    url: 'http://jsonplaceholder.typicode.com/users/1',
    method: 'GET'
});

const click$ = Rx.Observable.fromEvent(document, 'click');

click$.subscribe({
    next: function(ev) {
        userData$.subscribe(function(data) => {
            console.log(data.response)
        })
    }
})
```

Solution

```js
Rx.Observable.fromEvent(document, 'click');
    .switchMap(Rx.Observable.ajax({
        url: 'http://jsonplaceholder.typicode.com/users/1',
        method: 'GET'
    }))
    .map(data => data.response)
    .subscribe(data => {
        console.log(data)
    })
```

### Start/Stop timer

One subscribe with two buttons

```html
<button id="btnStart">Start</button>
<button id="btnStop">Stop</button>
```

```js
const btnStart$ = Rx.Observable.fromEvent(btnStart, 'click')
const btnStop$ = Rx.Observable.fromEvent(btnStop, 'click')

btnStart$.merge(btnStop$)
    .subscribe(x => console.log(x));

// alternative
Rx.Observable.merge(btnStart$, btnStop$)
    .subscribe(x => console.log(x));
```

Start & stop timer (log to console) with a start and stop button

```js
// works only once, after stop it doens't starts anymore
btnStart$.switchMap(event => Rx.Observable.interval(500))
    .takeUntil(btnStop$)
    .subscribe(observer);

// correct timer start/stop
btnStart$.switchMap(event => Rx.Observable.interval(500).takeUntil(btnStop$))
    .subscribe(observer);
```
