import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ErrorComponent } from './components/common/error/error.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CreateMultiplechoiceTestComponent } from './components/testHubTests/create/MCQ-test/create-multiplechoice-test.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/common/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PythonTestsComponent } from './components/testHubTests/create/python-test/create-python-test.component';
import { SubmissionsComponent } from './components/common/submissions/submissions.component';
import { MultipleChoiceTestComponent } from './components/testHubTests/submit/MCQ-test/submit-multiple-choice-test.component';
import { ResultMultipleChoiceTestComponent } from './components/testHubTests/results/result-multiple-choice-test/result-multiple-choice-test.component';
import { ResultSingleQuestionComponent } from './components/testHubTests/results/result-single-question/result-single-question.component';
import { SubmitPythonTaskComponent } from './components/testHubTests/submit/python-test/submit-python-task.component';
import { MyProfileComponent } from './components/profile/my-profile/my-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { SubmissionsMultipleChoiceTestsComponent } from './components/submissions/submissions-multiple-choice-tests/submissions-multiple-choice-tests.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ErrorComponent,
    FooterComponent,
    CreateMultiplechoiceTestComponent,
    HomeComponent,
    PythonTestsComponent,
    SubmissionsComponent,
    MultipleChoiceTestComponent,
    ResultMultipleChoiceTestComponent,
    ResultSingleQuestionComponent,
    SubmitPythonTaskComponent,
    MyProfileComponent,
    EditProfileComponent,
    SubmissionsMultipleChoiceTestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
