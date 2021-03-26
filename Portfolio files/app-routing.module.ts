import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyAuthGuard } from './myauthguard';
import { SignupComponent } from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "dashboard", component:DashboardComponent, canActivate:[MyAuthGuard]},
  {path: "signup", component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
