import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseCategoryComponent } from './add-course-category/add-course-category.component';
import { CourseRouthingModule } from './course-routhing.module';
import { FormsModule } from '@angular/forms';
import { CurrentCourseComponent } from './current-course/current-course.component';



@NgModule({
  declarations: [AddCourseCategoryComponent, CurrentCourseComponent],
  imports: [
    CommonModule,
    CourseRouthingModule,
    FormsModule
  ]
})
export class CourseModule { }
