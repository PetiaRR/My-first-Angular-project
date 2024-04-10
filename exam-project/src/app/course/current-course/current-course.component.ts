import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/types/course';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-course',
  templateUrl: './current-course.component.html',
  styleUrls: ['./current-course.component.css']
})
export class CurrentCourseComponent implements OnInit {
  course = {} as Course;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['courseId'];
debugger
      this.apiService.getCourse(id).subscribe((course) => {
        this.course = course;
      });
    });
  }
}