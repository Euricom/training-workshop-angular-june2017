import { Observable } from 'rxjs';

console.log('Hello from TS');

const btn: any = document.querySelector('#btn');
Observable
  .fromEvent(btn, 'click')
  .subscribe((x) => console.log(x));

