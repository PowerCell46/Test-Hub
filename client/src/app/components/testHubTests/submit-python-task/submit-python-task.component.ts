import { Component, OnInit } from '@angular/core';
import Prism from 'prismjs';
import { PythonTestService } from '../../../services/python-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeURLSegment, encodeURLSegment } from '../../../../assets/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  pythonTest: any;

  constructor(private route: ActivatedRoute, private pythonTestService: PythonTestService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
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
      this.pythonTest = params['taskName'];
    });
    
    this.pythonTestService.getPythonTestData(this.pythonTest).subscribe((data: any) => {
      data.topicTasks = data.topicTasks.map((task: any) => {
        return { ...task, encodedName: encodeURLSegment(task.name) };
      });

      this.pythonTest = data;
      // console.log(data);      
    });

  }

  onPythonTaskSubmit(): void {
    
    console.log(this.pythonTestSubmitForm.value);
    if (this.pythonTestSubmitForm.valid) {
            
    }
  }
}
