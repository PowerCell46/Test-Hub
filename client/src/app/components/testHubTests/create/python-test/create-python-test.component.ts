import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { CoursesTopicsService } from '../../../../services/courses-topics.service';
import { topicDefaultValueValidator } from '../../../../../assets/validators/topicValidator';
import { baseServerUrl } from '../../../../../assets/constants';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthenticationService, private courseTopicsService: CoursesTopicsService) {
    this.pythonTestForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', [Validators.required]],
      topic: [{value: null, disabled: true}, [topicDefaultValueValidator()]],
      description: ['', [Validators.required]],
      unitTests: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.courseTopicsService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onCourseSelect(): void {
    const selectedCourse = this.pythonTestForm.get('course')?.value;
    if (selectedCourse) {
      this.courseTopicsService.getTopics(selectedCourse).subscribe(topics => {        
        this.topics = topics;
        this.pythonTestForm.get('topic')?.enable();
        this.pythonTestForm.get('topic')?.setValue('Select a Topic');
      });
    }
  }


  updateCode(code: string) { // Updated the python syntax highlighting area
    this.highlightedCode = Prism.highlight(code, Prism.languages['python'], 'python');
  }

  onPythonTestSubmit(): void { // if valid ???
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
      }
    });
  }
}