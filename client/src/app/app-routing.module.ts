import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ErrorComponent } from './components/common/error/error.component';
import { CreateMultiplechoiceTestComponent } from './components/testHubTests/multipleChoiceTests/create-multiplechoice-test/create-multiplechoice-test.component';
import { RouteGuardService } from './services/route-guard.service';
import { HomeComponent } from './components/common/home/home.component';
import { PythonTestsComponent } from './components/testHubTests/pythonTests/python-tests.component';
import { SubmissionsComponent } from './components/common/submissions/submissions.component';
import { MultipleChoiceTestComponent } from './components/testHubTests/multiple-choice-test/multiple-choice-test.component';
import { ResultMultipleChoiceTestComponent } from './components/testHubTests/result-multiple-choice-test/result-multiple-choice-test.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', canActivate: [RouteGuardService], component: LogoutComponent},
  // {path: '', redirectTo: '/error', pathMatch: 'full'},
  // {path: '/error', component: ErrorComponent},
  {path: "createMultipleChoiceQuestion", component: CreateMultiplechoiceTestComponent},
  {path: "createPythonTest", component: PythonTestsComponent},
  {path: "submissions", component: SubmissionsComponent},
  {path: "contests/:courseName/:topicName/multiple-choice/:taskName", component: MultipleChoiceTestComponent},
  {path: "submissions/multipleChoiceTest/:submissionId", component: ResultMultipleChoiceTestComponent},
  {path: "contests/:courseName/:topicName/python/:taskName", component: LoginComponent} // Put the right component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
