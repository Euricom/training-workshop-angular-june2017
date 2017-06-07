import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: `
    <h1>Sample</h1>
    <div>{{message}}<div>
  `
})
export class SampleComponent  {
  message = 'This is my message';

  constructor() {
  }
}
