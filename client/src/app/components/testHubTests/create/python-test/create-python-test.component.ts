import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { CoursesTopicsTestsService } from '../../../../services/coursesTopicsTests/courses-topics-tests.service';
import { topicDefaultValueValidator } from '../../../../../assets/validators/topicValidator';
import { baseServerUrl, toastifyParams } from '../../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-python-tests',
  templateUrl: './create-python-test.component.html',
  styleUrls: ['./create-python-test.component.css']
})
export class PythonTestsComponent implements OnInit {
  courses: any = [];
  topics: any = [];
  pythonTestForm: FormGroup;
  highlightedCode: string = '';
  formSubmitted: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private authService: AuthenticationService,
      private courseTopicsTestsService: CoursesTopicsTestsService
    ) {
    this.pythonTestForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', [Validators.required]],
      topic: [{value: null, disabled: true}, [Validators.required, topicDefaultValueValidator()]],
      description: ['', [Validators.required]],
      unitTests: ['', [Validators.required, Validators.minLength(10)]]
    });
  }


  ngOnInit(): void {
    this.courseTopicsTestsService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }


  onCourseSelect(): void {
    const selectedCourse = this.pythonTestForm.get('course')?.value;
    if (selectedCourse) {
      this.courseTopicsTestsService.getTopics(selectedCourse).subscribe((topics: string[]) => {        
        this.topics = topics;
        this.pythonTestForm.get('topic')?.enable();
        this.pythonTestForm.get('topic')?.setValue('Select a Topic');
      });
    }
  }


  updateCode(code: string) { // Update the Python syntax highlighting area
    this.highlightedCode = Prism.highlight(code, Prism.languages['python'], 'python');
  }


  onPythonTestSubmit(): void { 
    this.formSubmitted = true;
    
    if (this.pythonTestForm.valid) {
      const formData = new FormData();
      formData.append('title', this.pythonTestForm.get('title')?.value ?? '');
      formData.append('course', this.pythonTestForm.get('course')?.value ?? '');
      formData.append('topic', this.pythonTestForm.get('topic')?.value ?? '');
      formData.append('unitTests', this.pythonTestForm.get('unitTests')?.value ?? '');
    
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('description', fileInput.files[0]);
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });
  
      this.http.post(`${baseServerUrl}testHub/createPythonTest/`, formData, {headers: headers})
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        }, 
        error: err => {
          console.error(err);
          Toastify({
            text: "Python Submission error: Please try again later.",
            duration: 3000,
            close: toastifyParams.close,
            gravity: "top",
            position: "center",
            backgroundColor: toastifyParams.errorBackgroundColor,
          }).showToast();
        }
      });

    } else {
      Toastify({
        text: "Please fill in all required fields correctly.",
        duration: 3000,
        close: toastifyParams.close,
        gravity: "top",
        position: "center",
        backgroundColor: toastifyParams.errorBackgroundColor,
      }).showToast();
    }   
  }
}