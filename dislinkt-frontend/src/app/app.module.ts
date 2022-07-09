import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';




import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './user/home/home.component';
import { SearchComponent } from './user/search/search.component';
import { InfoComponent } from './user/info/info.component';
import { NewPostComponent } from './user/new-post/new-post.component';
import { MaterialModule } from 'src/material.module';
import { RequestsComponent } from './user/requests/requests.component';
import { TwoFAComponent } from './two-fa/two-fa.component';
import { CustomInterceptor } from './service/interceptor';
import { ProfileComponent } from './user/profile/profile.component';
import { ApiTokenComponent } from './user/api-token/api-token.component';
import { ClipboardModule } from 'ngx-clipboard';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery/password-recovery.component';
import { CreateNewPasswordComponent } from './password-recovery/create-new-password/create-new-password.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { MagicLinkComponent } from './passwordless-login/magic-link/magic-link.component';
import { BlockedComponent } from './user/blocked/blocked.component';
import { PostComponent } from './user/post/post.component';
import { LikesDialogComponent } from './user/profile/likes-dialog/likes-dialog.component';
import { CommentsDialogComponent } from './user/profile/comments-dialog/comments-dialog.component';
import { NotificationsComponent } from './user/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SearchComponent,
    InfoComponent,
    NewPostComponent,
    RequestsComponent,
    TwoFAComponent,
    ProfileComponent,
    ApiTokenComponent,
    PasswordRecoveryComponent,
    CreateNewPasswordComponent,
    PasswordlessLoginComponent,
    MagicLinkComponent,
    BlockedComponent,
    PostComponent,
    LikesDialogComponent,
    CommentsDialogComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    ClipboardModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
