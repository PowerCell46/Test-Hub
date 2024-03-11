import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ErrorComponent } from './components/common/error/error.component';
import { CreateMultiplechoiceTestComponent } from './components/testHubTests/create/MCQ-test/create-multiplechoice-test.component';
import { RouteGuardService } from './services/routeGuard/route-guard.service';
import { HomeComponent } from './components/common/home/home.component';
import { PythonTestsComponent } from './components/testHubTests/create/python-test/create-python-test.component';
import { SubmissionsComponent } from './components/submissions/python-tests/submissions-python-test.component';
import { MultipleChoiceTestComponent } from './components/testHubTests/submit/MCQ-test/submit-multiple-choice-test.component';
import { ResultMultipleChoiceTestComponent } from './components/testHubTests/results/result-multiple-choice-test/result-multiple-choice-test.component';
import { ResultSingleQuestionComponent } from './components/testHubTests/results/result-single-question/result-single-question.component';
import { SubmitPythonTaskComponent } from './components/testHubTests/submit/python-test/submit-python-task.component';
import { MyProfileComponent } from './components/profile/my-profile/my-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { SubmissionsMultipleChoiceTestsComponent } from './components/submissions/MCQ-tests/submissions-multiple-choice-tests.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', canActivate: [RouteGuardService], component: LogoutComponent},
  
  {path: "createMultipleChoiceQuestion", component: CreateMultiplechoiceTestComponent},
  {path: "createPythonTest", component: PythonTestsComponent},

  {path: "submissions/python", component: SubmissionsComponent},
  {path: "submissions/multipleChoiceTests", component: SubmissionsMultipleChoiceTestsComponent},
  {path: "submissions/multipleChoiceTest/:submissionId", component: ResultMultipleChoiceTestComponent},
  {path: "submissions/multipleChoiceTest/:submissionId/:questionId", component: ResultSingleQuestionComponent},
  
  {path: "contests/:courseName/:topicName/multiple-choice/:taskName", component: MultipleChoiceTestComponent},
  {path: "contests/:courseName/:topicName/python/:taskName", component: SubmitPythonTaskComponent},

  {path: "myProfile", component: MyProfileComponent},
  {path: "editProfile", component: EditProfileComponent}

  // {path: '', redirectTo: '/error', pathMatch: 'full'},
  // {path: '/error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
