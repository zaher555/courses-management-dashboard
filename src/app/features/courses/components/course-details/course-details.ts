import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses-service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
  standalone: false
})
export class CourseDetails implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  courseService = inject(CoursesService)
  router = inject(Router)
  courseId: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))

  course$=this.courseService.getCourse(this.courseId)

  ngOnInit(): void {
  }

  backToList(){
    this.router.navigateByUrl('/courses')
  }

}
