import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./admin/admin-routing.module').then(mode => mode.AdminRoutingModule) },
  { path: '', loadChildren: () => import('./user/user-routing.module').then(mode => mode.UserRoutingModule) },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
