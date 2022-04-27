import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './user/home/home.component';
import { InfoComponent } from './user/info/info.component';
import { NewPostComponent } from './user/new-post/new-post.component';
import { SearchComponent } from './user/search/search.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'info', component: InfoComponent },
  { path: 'newPost', component: NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
