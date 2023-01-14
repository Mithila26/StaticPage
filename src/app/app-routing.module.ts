import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ClaimsComponent } from './Components/claims/claims.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { ApiService } from 'src/app/Services/api.services';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { UserViewComponent } from './Components/user-view/user-view.component';
import { PopUp1Component } from './Components/PopUp1/pop-up1.component';
import { PremiumComponent } from './Components/premium/premium.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signUp', component: RegisterUserComponent },
  { path: 'claims', component: ClaimsComponent, canActivate: [ApiService] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'userView', component: UserViewComponent, canActivate: [ApiService] },
  { path: 'adminView', component: PopUp1Component, canActivate: [ApiService] },
  { path: 'premium', component: PremiumComponent, canActivate: [ApiService]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ApiService]
})
export class AppRoutingModule { }
