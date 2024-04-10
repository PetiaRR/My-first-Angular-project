import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-add-course-category',
  templateUrl: './add-course-category.component.html',
  styleUrls: ['./add-course-category.component.css']
})
export class AddCourseCategoryComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }
debugger
    const { courseName, post } = form.value;
    const userId = sessionStorage.getItem("token")
    this.apiService.createCourse(courseName, post).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }
}
