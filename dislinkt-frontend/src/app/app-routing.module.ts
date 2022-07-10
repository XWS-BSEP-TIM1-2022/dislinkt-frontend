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
import { LoggedInGuardService } from './service/logged-in-guard.service';
import { PageForAdminComponent } from './admin/page-for-admin/page-for-admin.component';
import { AdminGuardService } from './service/admin-guard.service';
import { MagicLinkComponent } from './passwordless-login/magic-link/magic-link.component';
import { BlockedComponent } from './user/blocked/blocked.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { SuggestionsComponent } from './user/suggestions/suggestions.component';
import { ChatsComponent } from './chats/chats.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'info', component: InfoComponent },
  { path: 'newPost', component: NewPostComponent, canActivate: [LoggedInGuardService] },
  { path: 'requests', component: RequestsComponent, canActivate: [LoggedInGuardService] },
  { path: '2fa', component: TwoFAComponent },
  { path: 'posts/:id', component: ProfileComponent },
  { path: 'api-token', component: ApiTokenComponent, canActivate: [LoggedInGuardService] },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'create-new-password/:id', component: CreateNewPasswordComponent },
  { path: 'passwordless-login', component: PasswordlessLoginComponent },
  { path: 'page-for-admin', component: PageForAdminComponent, canActivate: [AdminGuardService]},
  { path: 'login/:userId/:requestId', component: MagicLinkComponent },
  { path: 'blocked', component: BlockedComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'chats/:chatId', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
