import { Routes } from '@angular/router';
import { CourseDetails } from './components/course-details/course-details';
import { CoursesList } from './components/courses-list/courses-list';
import { AddEditCourse } from './components/add-edit-course/add-edit-course';

export const routes: Routes = [
    {
        path: '',
        component: CoursesList // Displays at: http://localhost:4200/courses
    },
    {
        path:'new',
        component:AddEditCourse
    },
    {
        path:':id/edit',
        component:AddEditCourse
    },
    {
        path: ':id',
        component: CourseDetails
    },
];
