import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseServerUrl } from '../../assets/constants';
interface Topic {
  name: string;
 }

@Injectable({
  providedIn: 'root'
})
export class CoursesTopicsService {
  requestUrl: string =  `${baseServerUrl}testHub/getCoursesAndTopics/`;
  constructor(private http: HttpClient) { }

  getCourses(): Observable<string[]> {
    return this.http.get<any[]>(this.requestUrl).pipe(
      map(data => data.map(course => course.name))
    );
  }
   
  getTopics(selectedCourse: string): Observable<any> {
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
