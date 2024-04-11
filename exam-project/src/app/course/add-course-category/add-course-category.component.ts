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

    const { courseName, post } = form.value;
    const user = sessionStorage.getItem('token');
    
    if (user) {
      const userIdObj = JSON.parse(user);
      const userId = userIdObj.userId
      this.apiService.createCourse(courseName, post, userId).subscribe(() => {
        this.router.navigate(['/courses']);
      })
    }
    //const userIdObj = JSON.parse(userId);
    // this.apiService.createCourse(courseName, post, userId).subscribe(() => {
    //   this.router.navigate(['/courses']);
    // });
  }
}
