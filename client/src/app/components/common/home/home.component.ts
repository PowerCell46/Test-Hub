import { Component } from '@angular/core';
import { HomePageCourse } from '../../../../assets/interfaces/main-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses: HomePageCourse[] = [
    {title: "Python Basics", 
    topics: [
      {title: "First Steps in Coding", 
      tasks: [
        {title: "Hello TestHub"}, 
        {title: "Nums 1...10"}, 
        {title: "Square Area"}, 
        {title: "Inches to Centimeters"}, 
        {title: "Greeting by Name"}]},
      {title: "Conditional Statements", tasks: []},
      {title: "For Loop", tasks: []},
      {title: "While Loop", tasks: []},
      {title: "Nested Loops", tasks: []},
      {title: "Exam Preparation", tasks: []}]},
    {title: "Python Fundamentals", topics: []},
    {title: "Python Advanced", topics: []},
    {title: "Python OOP", topics: []},
    {title: "JS Basics", topics: []},
    {title: "JS Fundamentals", topics: []},
  ];  
}
