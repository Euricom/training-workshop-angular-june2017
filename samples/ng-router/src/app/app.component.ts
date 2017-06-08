import { Component } from '@angular/core'

@Component({
  selector: 'app',
  template: `
    <h1>
      {{title}}
    </h1>
    {{toggle}}
    <button (click)="toggle= !toggle">toggle</button>
    <nav>
        <a routerLink="/foo" routerLinkActive="active-link">Foo</a>
        <a routerLink="/bar" routerLinkActive="active-link">Bar</a>
        <a routerLink="/admin" routerLinkActive="active-link">Admin</a>
    </nav>
    <hr/>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'app work'
  toggle = true;
}
