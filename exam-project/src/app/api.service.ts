import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './types/course';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCourses() {
    const apiUrl= 'http://localhost:3000';
    return this.http.get<Course[]>(`${apiUrl}/courses`);
  }

  getCourse(id: string) {
    const apiUrl= 'http://localhost:3000';
    return this.http.get<Course>(`${apiUrl}/courses/${id}`);
  }

  createCourse(courseName: string, post: string, userId: string) {
    const apiUrl= 'http://localhost:3000';
    return this.http.post<Course>(`${apiUrl}/courses`, { courseName, post, userId });
  }


}
