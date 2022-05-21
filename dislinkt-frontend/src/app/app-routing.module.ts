import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiTokenComponent } from './user/api-token/api-token.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TwoFAComponent } from './two-fa/two-fa.component';
import { HomeComponent } from './user/home/home.component';
import { InfoComponent } from './user/info/info.component';
import { NewPostComponent } from './user/new-post/new-post.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RequestsComponent } from './user/requests/requests.component';
import { SearchComponent } from './user/search/search.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery/password-recovery.component';
import { CreateNewPasswordComponent } from './password-recovery/create-new-password/create-new-password.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'info', component: InfoComponent },
  { path: 'newPost', component: NewPostComponent },
  { path: 'requests', component: RequestsComponent },
  { path: '2fa', component: TwoFAComponent },
  { path: 'posts/:id', component: ProfileComponent },
  { path: 'api-token', component: ApiTokenComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'create-new-password/:id', component: CreateNewPasswordComponent },
  { path: 'passwordless-login', component: PasswordlessLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
