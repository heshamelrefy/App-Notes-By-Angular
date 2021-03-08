import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"" ,redirectTo:"signin",pathMatch:"full"},
  {path:"signup" ,component:SignupComponent},
  {path:"signin" ,component:SigninComponent},
  {path:"profile" ,canActivate:[AuthGuard],component:ProfileComponent},
  {path:"**" ,component:NotFoundComponent},
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
