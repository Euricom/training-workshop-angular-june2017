import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component'

const routes: Routes = [
  { path: '', component: AdminComponent },
]

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class AdminModule { }
