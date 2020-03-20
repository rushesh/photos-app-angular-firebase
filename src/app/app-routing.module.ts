import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/component/login/login.component';
import { PagenotfoundComponent } from '../app/component/pagenotfound/pagenotfound.component';

import { ContactusComponent } from '../../src/app/component/contactus/contactus.component';
import { AboutusComponent } from '../../src/app/component/aboutus/aboutus.component';

import { AuthGuard } from 'src/app/guard/auth.guard';
import { AppSubComponentComponent } from './component/app-sub-component/app-sub-component.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'images', component: AppSubComponentComponent ,canActivate : [AuthGuard]},

  { path: 'contactus', component: ContactusComponent },
  { path: 'aboutus', component: AboutusComponent },
  
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
