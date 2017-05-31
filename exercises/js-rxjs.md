# Exercises RXJS

## Basic operators

- Create a stream of a single element with type string

- Create a subscription that fires once, if you hover over a text element

- Count the number of elements in a array (with an observable stream)

- Count the number of click events on a button

- Create a count down timer in seconds (10 - 0)

- Create a observable stream of an input box value change

    + only pass value when more then 3 characters are entered
    + only after a pause of 500ms we get the next value
    + all must be uppercase

- Create a subscription on a button click that auto unsubscribe after 5 seconds

    + and create the marble diagram for it


```
// operators to use
interval, map, take, filter, debounceTime, count, scan, takeUtil
```

## Create your own observable

- Create a observable from a button click, use Observable.create()
- Implement the cleanup (unsubscribe)


```html
<button id="myBtn">Click me</button>
```

```js
function createFromButtonClick(btn) {
    // implement this
}

const stream$ = createFromButtonClick('#myBtn');
stream$.subscribe(result => console.log(result));

```

```js
function onClick(event) {
    console.log(event);
}
// to register a button click
document.getElementById("myBtn").addEventListener("click", onClick);

// to unregister a button click handler
document.getElementById("myBtn").removeEventListener("click", onClick);
```

## Combine observables

Step1: One subscribe with two buttons

```html
<button id="btnStart">Start</button>
<button id="btnStop">Stop</button>
```

```js
const btnStart$ = Rx.Observable.fromEvent(btnStart, 'click')
const btnStop$ = Rx.Observable.fromEvent(btnStop, 'click')

// combine the 2 click streams
```

Step2: Start & stop timer (log to console) with a start and stop button
