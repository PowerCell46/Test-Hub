import { Component, OnInit } from '@angular/core';
import { Courses, Integration } from '../../../../assets/interfaces/main-interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CoursesTopicsTestsService } from '../../../services/coursesTopicsTests/courses-topics-tests.service';
import { encodeURLSegment } from '../../../../assets/utils';
import { projectIntegrations } from '../../../../assets/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.media-queries.css'],
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
  integrations: Integration[] = projectIntegrations;
  username: string | null = null;

  constructor(
    private courseTopicsTestsService: CoursesTopicsTestsService
  ) {}


  ngOnInit(): void {
    this.courseTopicsTestsService.getCoursesTopicsTests().subscribe(data => {
      this.courses = data;
      this.username = localStorage.getItem('username');
      this.courses.forEach(course => {
        course.visible = false; 
        course.encoded = encodeURLSegment(course.name); // encode the Name so it can be used in the URL
        course.topics.forEach(topic => {
          topic.visible = false;
          topic.encoded = encodeURLSegment(topic.name); // encode the Name so it can be used in the URL
          topic.multiple_choice_tests.forEach(multiple_choice_test => {
            multiple_choice_test.visible = false;
            multiple_choice_test.encoded = encodeURLSegment(multiple_choice_test.title); // encode the Name so it can be used in the URL
          });
          topic.py_tests.forEach(py_test => {
            py_test.visible = false;
            py_test.encoded = encodeURLSegment(py_test.title); // encode the Name so it can be used in the URL
          });
        });
      });

      // console.log(this.courses);
    });
    this.username = localStorage.getItem('username');
  }
  

  toggleTopics(courseTitle: string): void { // Hide & Show topics
    const course = this.courses.find(c => c.name === courseTitle);

    if (course) {
      course.visible = !course?.visible
    }
  }


  toggleTasks(courseTitle: string, topicTitle: string): void { // Hide & Show Tasks
    const topic = this.courses.find(c => c.name === courseTitle)?.topics.find(t => t.name === topicTitle);

    if (topic) {
      topic.visible = !topic.visible
    }
  }
}