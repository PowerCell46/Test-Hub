import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseServerUrl } from '../../../assets/constants';
interface Topic {
  name: string;
 }

@Injectable({
  providedIn: 'root'
})
export class CoursesTopicsTestsService {
  requestUrl: string =  `${baseServerUrl}testHub/coursesTopicsTests/`;
  
  constructor(
    private http: HttpClient
  ) { }

  getCoursesTopicsTests(): Observable<any> {
    return this.http.get<any[]>(this.requestUrl).pipe();
  }

  getCourses(): Observable<string[]> { // returns an array of all the courses names
    return this.http.get<any[]>(this.requestUrl).pipe(
      map(data => data.map(course => course.name))
    );
  }
   
  getTopics(selectedCourse: string): Observable<any> { // returns an array of the selected course topics
    return this.http.get<any[]>(this.requestUrl).pipe(
       map(courses => {        
         const selectedCourseObj = courses.find(course => course.name === selectedCourse);
         if (selectedCourseObj && selectedCourseObj.topics) {
           return selectedCourseObj.topics.map((t: Topic) => t.name);
         }
         return [];
       })
    );
   }
}
