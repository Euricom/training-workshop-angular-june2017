import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { FooComponent } from './components/foo.component'
import { BarComponent } from './components/bar.component'
import { PageNotFoundComponent } from './components/notfound.component'

import { NgShowDirective} from './directives/ngshow.directive';

import '../style.css'

const appRoutes: Routes = [
  { path: 'foo', component: FooComponent },
  { path: 'bar', component: BarComponent },
  { path: 'admin', loadChildren: './+admin/admin.module#AdminModule?chunkName=admin' },
  { path: '', redirectTo: '/foo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    BarComponent,
    PageNotFoundComponent,
    NgShowDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
