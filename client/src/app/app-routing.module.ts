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
import { NonAuthGuardService } from './services/routerGuards/nonAuthGuard/non-auth-guard.service';
import { AuthGuardService } from './services/routerGuards/AuthGuard/auth-guard.service';

const routes: Routes = [
  {path: "", component: HomeComponent}, // Home Page - accessible by everyone
  {path: 'register', component: RegisterComponent, canActivate: [NonAuthGuardService]}, // Register - non-authenticated
  {path: 'login', component: LoginComponent, canActivate: [NonAuthGuardService]}, // Login - non-authenticated
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]}, // Logout - authenticated
  
  {path: "createMultipleChoiceQuestion", component: CreateMultiplechoiceTestComponent, canActivate: [AuthGuardService]}, // Create MCQ - authenticated + Teacher role
  {path: "createPythonTest", component: PythonTestsComponent, canActivate: [AuthGuardService]}, // Create Python - authenticated + Teacher role

  {path: "submissions/python", component: SubmissionsComponent}, // Python Submissions - accessible by everyone
  {path: "submissions/multipleChoiceTests", component: SubmissionsMultipleChoiceTestsComponent}, // MCQ Submissions -  accessible by everyone
  {path: "submissions/multipleChoiceTest/:submissionId", component: ResultMultipleChoiceTestComponent, canActivate: [AuthGuardService]}, // Result MCQ - authenticated
  {path: "submissions/multipleChoiceTest/:submissionId/:questionId", component: ResultSingleQuestionComponent, canActivate: [AuthGuardService]}, // Result single MCQ - authenticated
  
  {path: "contests/:courseName/:topicName/multiple-choice/:taskName", component: MultipleChoiceTestComponent, canActivate: [AuthGuardService]}, // Submit MCQ - authenticated
  {path: "contests/:courseName/:topicName/python/:taskName", component: SubmitPythonTaskComponent, canActivate: [AuthGuardService]}, // Submit Python - authenticated

  {path: "myProfile", component: MyProfileComponent, canActivate: [AuthGuardService]}, // My Profile - authenticated
  {path: "editProfile", component: EditProfileComponent, canActivate: [AuthGuardService]}, // Edit Profile - authenticated

  {path: '**', component: ErrorComponent}, // Error Page - accessible by everyone
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
