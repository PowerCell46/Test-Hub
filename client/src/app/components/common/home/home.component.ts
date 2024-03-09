import { Component, OnInit } from '@angular/core';
import { Courses, Integration } from '../../../../assets/interfaces/main-interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CoursesTopicsService } from '../../../services/courses-topics.service';
import { encodeURLSegment } from '../../../../assets/utils';

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
  integrations: Integration[] = [
    {
      title: "Faculty of Mathematics and Informatics", 
      description: `For the last two semesters I've had lectures and exercises at FMI,
        studying Foundations of Programming, Databases and
        Object-Oriented-Programming. <br> In one way or another I helped with the
        teaching process and completely undestand the need of such a platform,
        where students can exercise and get an instant feedback for their
        tasks.`, 
      imageUrl: "../../../../assets/images/FMI.PNG", 
      id: ""
    },
    {
      title: "SPGE John Atanasov", 
      description: `I've talked with a few teachers from the School that such a system can be of a great use if implemented successfully.
        <br> Again same as the case with FMI, teachers can create tasks that students can try to solve and get an instant result, which will definitely help with the learning process.`,
      imageUrl: "../../../../assets/images/SPGE.jpg", 
      id: "SPGE-img"
    },
    {
      title: "Faculty of Geology and Geography", 
      description: `The project can be implemented mainly with the Multiple Choice Question Tests.
        <br> Teachers can add sample tests that students can use in order to prepare for the Examination session.`,
      imageUrl: 'https://web.gea.uni-sofia.bg/wp-content/uploads/2020/11/%D0%93%D0%93%D0%A4-%D0%9B%D0%BE%D0%B3%D0%BE-%D0%BC%D0%B0%D0%BB%D0%BA%D0%BE-150%D1%85150.png',
      id: "GGF-img"
    }
  ]

  constructor(private courseTopicSerice: CoursesTopicsService) {}

  ngOnInit(): void {
    this.courseTopicSerice.getCoursesTopicsTests().subscribe(data => {
      this.courses = data;
  
      this.courses.forEach(course => {
        course.visible = false; 
        course.encoded = encodeURLSegment(course.name);
        course.topics.forEach(topic => {
          topic.visible = false;
          topic.encoded = encodeURLSegment(topic.name);
          topic.multiple_choice_tests.forEach(multiple_choice_test => {
            multiple_choice_test.visible = false;
            multiple_choice_test.encoded = encodeURLSegment(multiple_choice_test.title);
          });
          topic.py_tests.forEach(py_test => {
            py_test.visible = false;
            py_test.encoded = encodeURLSegment(py_test.title);
          });
        });
      });

      // console.log(this.courses);
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