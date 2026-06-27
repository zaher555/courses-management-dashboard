import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // Points to your local json-server instance
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourse(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  editCourse(courseId:number,course:Course): Observable<Course>{
    return this.http.put<Course>(`${this.apiUrl}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/${courseId}`)
  }
}