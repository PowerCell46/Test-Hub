import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { CreateMultiplechoiceTestComponent } from './create-multiplechoice-test/create-multiplechoice-test.component';
import { RouteGuardService } from './route-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  // {path: '', redirectTo: '/error', pathMatch: 'full'},
  // {path: '/error', component: ErrorComponent},
  {path: "createMultipleChoiceQuestion",canActivate: [RouteGuardService],  component: CreateMultiplechoiceTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
