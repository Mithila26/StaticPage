import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'feedback', component:FeedbackComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
