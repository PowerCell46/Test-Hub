import { Component, OnInit } from '@angular/core';
import Prism from 'prismjs';
import { PythonTestService } from '../../../services/python-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeURLSegment, encodeURLSegment } from '../../../../assets/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../services/authentication.service';
import { baseServerUrl } from '../../../../assets/constants';

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

  constructor(private route: ActivatedRoute, private pythonTestService: PythonTestService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.pythonTestSubmitForm = this.formBuilder.group({
      code: ['', [Validators.required]]
    });
  }

  updateCode(code: string) { // Updated the python syntax highlighting area
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

      this.pythonTest = data;
      console.log(data);      
    });

  }


  getArray(num: number): any[] {
    return new Array(num);
  }

  reloadPage() {
    window.location.reload();
  }

  onPythonTaskSubmit(): void {
    
    console.log(this.pythonTestSubmitForm.value);
    
    if (this.pythonTestSubmitForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      });
      
      this.http.post(`${baseServerUrl}testHub/pythonTest/${this.pythonTestName}/`, this.pythonTestSubmitForm.value, {headers: headers})
      .subscribe({
        next: () => {

          alert("Successfully Sent!");
          // this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
