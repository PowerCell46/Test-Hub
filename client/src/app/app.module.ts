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
import { CreateMultiplechoiceTestComponent } from './components/testHubTests/multipleChoiceTests/create-multiplechoice-test/create-multiplechoice-test.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/common/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PythonTestsComponent } from './components/testHubTests/pythonTests/python-tests.component';
import { SubmissionsComponent } from './components/common/submissions/submissions.component';
import { MultipleChoiceTestComponent } from './components/testHubTests/multiple-choice-test/multiple-choice-test.component';
import { ResultMultipleChoiceTestComponent } from './components/testHubTests/result-multiple-choice-test/result-multiple-choice-test.component';


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
    ResultMultipleChoiceTestComponent
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
