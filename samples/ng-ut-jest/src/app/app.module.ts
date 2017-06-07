import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { SampleComponent } from './components/sample.component';

// pipes
import { CapitalisePipe } from './pipes/capitalisePipe';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    CapitalisePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
