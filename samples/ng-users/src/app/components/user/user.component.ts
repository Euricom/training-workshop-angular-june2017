import { Component, Input } from '@angular/core'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() user
}
