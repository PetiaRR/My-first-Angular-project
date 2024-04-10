import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseCategoryComponent } from './add-course-category/add-course-category.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../guards/auth.activate';
import { CurrentCourseComponent } from './current-course/current-course.component'



const routes: Routes = [
  {
    path: 'courses',
    children: [
      //{ path: '', pathMatch: 'full', component: MainComponent },
      { path: ':courseId', component: CurrentCourseComponent },
    ],
  },
  {
    path: 'add-course',
    component: AddCourseCategoryComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  //imports: [
    //CommonModule
  //]
})
export class CourseRouthingModule { }
