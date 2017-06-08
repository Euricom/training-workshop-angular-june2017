import { Component } from '@angular/core'

@Component({
  selector: 'bar',
  template: `
    <h1>
      Bar: {{title}}
    </h1>
  `,
  styles: [
    `
      :host {
        display: block;
        border: 1px solid black;
      }
    `,
  ]
})
export class BarComponent {
  title = 'The world of components'
}
