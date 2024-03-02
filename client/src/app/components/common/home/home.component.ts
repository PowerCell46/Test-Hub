import { Component } from '@angular/core';
import { HomePageCourse } from '../../../../assets/interfaces/main-interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
export class HomeComponent {
  courses: HomePageCourse[] = [
    {title: "Python Basics", 
    visible: false,
    topics: [
      {title: "First Steps in Coding", 
      visible: false,
      tasks: [
        {title: "Hello TestHub"}, 
        {title: "Nums 1...10"}, 
        {title: "Square Area"}, 
        {title: "Inches to Centimeters"}, 
        {title: "Greeting by Name"}]},
      {title: "Conditional Statements", visible: false, tasks: []},
      {title: "For Loop", visible: false, tasks: []},
      {title: "While Loop", visible: false, tasks: []},
      {title: "Nested Loops", visible: false, tasks: []},
      {title: "Exam Preparation", visible: false, tasks: []}]},
    {title: "Python Fundamentals", visible: false, topics: []},
    {title: "Python Advanced",  visible: false, topics: []},
    {title: "Python OOP",  visible: false, topics: []},
    {title: "JS Basics",  visible: false, topics: []},
    {title: "JS Fundamentals",  visible: false, topics: []},
  ];  

  toggleTopics(courseTitle: string): void {
    const course = this.courses.find(c => c.title === courseTitle);

    if (course) {
      course.visible = !course?.visible
    }
  }

  toggleTasks(courseTitle: string, topicTitle: string): void {
    const topic = this.courses.find(c => c.title === courseTitle)?.topics.find(t => t.title === topicTitle);

    if (topic) {
      topic.visible = !topic.visible
    }
  }
}
