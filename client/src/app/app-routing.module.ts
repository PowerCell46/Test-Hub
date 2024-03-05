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
import { ResultSingleQuestionComponent } from './components/testHubTests/result-single-question/result-single-question.component';
import { SubmitPythonTaskComponent } from './components/testHubTests/submit-python-task/submit-python-task.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', canActivate: [RouteGuardService], component: LogoutComponent},
  
  {path: "createMultipleChoiceQuestion", component: CreateMultiplechoiceTestComponent},
  {path: "createPythonTest", component: PythonTestsComponent},

  {path: "submissions", component: SubmissionsComponent},
  {path: "submissions/multipleChoiceTest/:submissionId", component: ResultMultipleChoiceTestComponent},
  {path: "submissions/multipleChoiceTest/:submissionId/:questionId", component: ResultSingleQuestionComponent},
  
  {path: "contests/:courseName/:topicName/multiple-choice/:taskName", component: MultipleChoiceTestComponent},
  {path: "contests/:courseName/:topicName/python/:taskName", component: SubmitPythonTaskComponent}

  // {path: '', redirectTo: '/error', pathMatch: 'full'},
  // {path: '/error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
