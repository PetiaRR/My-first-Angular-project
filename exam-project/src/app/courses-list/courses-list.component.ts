import { Component, OnInit } from '@angular/core';
import { Course } from '../types/course';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] | null = [];
  isLoading: boolean = true;

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?.id || '';
  }

  ngOnInit(): void {
    
    this.api.getCourses().subscribe((courses) => {
      
      const sortDatesCB = (
        a: { created_at: string },
        b: { created_at: string }
      ) => (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
      const tempCourses = courses.sort(sortDatesCB as any);

      this.courses = tempCourses;

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  
}
