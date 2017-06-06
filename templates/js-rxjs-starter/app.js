const btn = document.querySelector('#btn')
Rx.Observable
  .fromEvent(btn, 'click')
  .subscribe(x => console.log(x))
