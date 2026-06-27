import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses-service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.html',
  styleUrl: './add-edit-course.scss',
  standalone: false,
  providers: [MessageService]
})
export class AddEditCourse implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  courseService = inject(CoursesService)
  formBuilder = inject(FormBuilder)
  messageService = inject(MessageService)
  router = inject(Router)

  courseId: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  course!: Course

  courseForm!: FormGroup
  statuses: any = [
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" }
  ];



  ngOnInit(): void {
    this.createForm()
    if (this.courseId) {
      this.courseService.getCourse(this.courseId).subscribe({
        next: (res => {
          this.course = res
          this.patchForm()
        })
      })
    }
  }

  formatDate() {
    const currentDate = new Date()
    const CurrentDay = currentDate.getDate()
    const CurrentMonth = currentDate.getMonth()
    const CurrentYear = currentDate.getFullYear()

    return `${CurrentYear}-${CurrentMonth}-${CurrentDay}`
  }

  createForm() {
    this.courseForm = this.formBuilder.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      instructor: ['', [Validators.required]],
      category: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]],
      status: ['', [Validators.required]],
      createdDate: [this.formatDate()],
    });
  }

  patchForm() {
    this.courseForm.patchValue({
      courseName: this.course.courseName,
      instructor: this.course.instructor,
      category: this.course.category,
      duration: this.course.duration,
      price: this.course.price,
      description: this.course.description,
      status: this.course.status?.id,
      createdDate: [this.formatDate()],
    })
  }

  addEditCourse() {
    this.courseForm.markAllAsTouched()
    if (this.courseForm.invalid)
      return;
    else {
      this.callApi()
    }
  }

  callApi() {
    if(this.courseId){
      this.courseService.editCourse(this.courseId,this.courseForm.value).subscribe({
        next: (res => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Course Updated Succsessfully',life:3000 });
          this.router.navigateByUrl('/courses')
        }),
        error: (err => {
          alert('issue')
        })
      })
    }
    else{
      this.courseService.addCourse(this.courseForm.value).subscribe({
        next: (res => {
          this.router.navigateByUrl('/courses')
          this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Course Added Succsessfully',life:3000 });
        }),
        error: (err => {
          alert('issue')
        })
      })
    }

  }

}
