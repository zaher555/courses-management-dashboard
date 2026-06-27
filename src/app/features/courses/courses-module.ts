import { NgModule } from '@angular/core';
import { CoursesList } from './components/courses-list/courses-list';
import { CourseDetails } from './components/course-details/course-details';
import { AddEditCourse } from './components/add-edit-course/add-edit-course';
import { SharedModule } from '../../shared/shared-module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './courses-module.routes';

@NgModule({
  declarations: [
    CoursesList,
    CourseDetails,
    AddEditCourse,
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CourseDetails,
    AddEditCourse,
    CoursesList
  ]
})
export class CoursesModule { }
