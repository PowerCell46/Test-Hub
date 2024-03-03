import { Component, OnInit } from '@angular/core';
import { Courses } from '../../../../assets/interfaces/main-interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CoursesTopicsService } from '../../../services/courses-topics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // Alias for void => *
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // Alias for * => void
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {  
  courses: Courses[] = [];

  constructor(private courseTopicSerice: CoursesTopicsService) {}

  ngOnInit(): void {
    this.courseTopicSerice.getCoursesTopicsTests().subscribe(data => {
      this.courses = data;
  
      this.courses.forEach(course => {
        course.visible = false; 
        course.topics.forEach(topic => {
          topic.visible = false;
          topic.multiple_choice_tests.forEach(multiple_choice_test => {
            multiple_choice_test.visible = false;
          });
          topic.py_tests.forEach(py_test => {
            py_test.visible = false;
          });
        });
      });
      console.log(this.courses);
      
    });
  }
  

  toggleTopics(courseTitle: string): void {
    const course = this.courses.find(c => c.name === courseTitle);

    if (course) {
      course.visible = !course?.visible
    }
  }

  toggleTasks(courseTitle: string, topicTitle: string): void {
    const topic = this.courses.find(c => c.name === courseTitle)?.topics.find(t => t.name === topicTitle);

    if (topic) {
      topic.visible = !topic.visible
    }
  }
}