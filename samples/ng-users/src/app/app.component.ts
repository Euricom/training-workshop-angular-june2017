// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventAggregator } from './services/eventAggregator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
      .active-link {
          background-color: lightgray
      }
  `],
})
export class AppComponent {
  errorMessage = '';
  title = 'app works!';

  constructor(private eventAggregator: EventAggregator) {
    eventAggregator.listen('ERROR')
      .subscribe(error => {
        this.errorMessage = error;
      });
  }
}
