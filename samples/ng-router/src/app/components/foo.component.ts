import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'foo',
  template: `
    <h1>
      Foo: {{title}}
    </h1>
  `,
})
export class FooComponent {
  title = 'The world of Foo components'
}
