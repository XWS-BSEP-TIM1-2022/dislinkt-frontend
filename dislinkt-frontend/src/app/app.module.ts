import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    TwoFAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
