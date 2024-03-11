import { Component, OnInit } from '@angular/core';
import Prism from 'prismjs';
import { PythonTestService } from '../../../../services/pythonTest/python-test.service';
import { ActivatedRoute } from '@angular/router';
import { encodeURLSegment } from '../../../../../assets/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { baseServerUrl, toastifyParams } from '../../../../../assets/constants';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  selector: 'app-submit-python-task',
  templateUrl: './submit-python-task.component.html',
  styleUrl: './submit-python-task.component.css'
})
export class SubmitPythonTaskComponent implements OnInit{
  highlightedCode: string = '';
  courseName: string = '';
  topicName: string = '';
  pythonTestSubmitForm: FormGroup;
  pythonTestName: any;
  pythonTest: any;

  constructor(
    private route: ActivatedRoute, 
    private pythonTestService: PythonTestService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.pythonTestSubmitForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  updateCode(code: string) { // Update the python syntax highlighting area
    this.highlightedCode = Prism.highlight(code, Prism.languages['python'], 'python');
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseName = params['courseName'];
      this.topicName = params['topicName'];
      this.pythonTestName = params['taskName'];
    });
    

    this.pythonTestService.getPythonTestData(this.pythonTestName).subscribe((data: any) => {
      data.topicTasks = data.topicTasks.map((task: any) => {
        return { ...task, encodedName: encodeURLSegment(task.name) };
      });
      // console.log(data);      
      this.pythonTest = data;
    });

  }


  getArray(num: number): any[] {
    return new Array(num);
  }


  reloadPage() {
    window.location.reload();
  }
  

  onPythonTaskSubmit(): void {
    if (this.pythonTestSubmitForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });
      
      this.http.post(`${baseServerUrl}testHub/pythonTest/${this.pythonTestName}/`, this.pythonTestSubmitForm.value, {headers: headers})
      .subscribe({
        next: () => {
          
          Toastify({
            text: "Successful Submission!",
            duration: 3000,
            close: toastifyParams.close,
            gravity: "top",
            position: "center",
            backgroundColor: toastifyParams.successBackgroundColor,
          }).showToast();
          
          setTimeout(() => {
            this.reloadPage();
          }, 3000);
          
        },
        error: (error) => {
          let errorMessage = "Submission error: Please try again later."; 
          if (error.error && typeof error.error === 'object') {
            Object.keys(error.error).forEach(key => {
              errorMessage = `${key}: ${error.error[key].join(" ")}`;
            });
          }
          Toastify({
            text: errorMessage,
            duration: 3000,
            close: toastifyParams.close,
            gravity: "top",
            position: "center",
            backgroundColor: toastifyParams.errorBackgroundColor,
          }).showToast();
        }
      });
      
    }  else {
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
