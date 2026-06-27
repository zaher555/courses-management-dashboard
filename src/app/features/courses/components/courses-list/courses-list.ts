import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses-service';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { ConfirmationService, MessageService } from 'primeng/api';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
  standalone: false,
  providers: [ConfirmationService, MessageService]
})
export class CoursesList implements OnInit {
  coursesService = inject(CoursesService)
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  items: any[] = [];
  selectedCourse: any = ''
  first: number = 0;
  rows: number = 10;
  courses$: Observable<Course[]> = this.coursesService.getCourses()
  allCourses: any[] = [];      // Stores the original list from backend
  filteredCourses!: any[];
  statuses: any = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" }
  ];
  selectedStatus: any = '';
  isSkeletonExist = false

  ngOnInit(): void {
    this.getAllCourses()
  }

  getAllCourses() {
    this.courses$.subscribe({
      next: (res => {
        this.isSkeletonExist = true
        this.allCourses = res
        this.filteredCourses = [...res];
        console.log(this.filteredCourses)
      }),
      error: (err => {
        this.isSkeletonExist = true
        alert('error fetching data!')
      }),
      complete: (() => {
        this.isSkeletonExist = false
      })
    })
  }


  search(event: AutoCompleteCompleteEvent) {
    // 1. Extract the string query and convert it to lowercase
    const query = event.query.toLowerCase();

    // 2. Filter using the courseName property, also lowered
    this.items = this.allCourses.filter(course =>
      course.courseName.toLowerCase().includes(query)
    );
  }

  filterList() {

    // filter by course name & status
    if (this.selectedCourse?.id && this.selectedStatus?.id) {
      this.filteredCourses = this.allCourses.filter(course => course.status?.label?.toLowerCase() === this.selectedStatus?.id && course?.id === this.selectedCourse?.id);
    }

    // filter by course name
    else if (this.selectedCourse?.id) {
      this.filteredCourses = this.allCourses.filter(course => course?.id === this.selectedCourse?.id);
    }

    // filter by status
    else if (this.selectedStatus?.id) {
      if (this.selectedStatus?.id !== 'all') {
        this.filteredCourses = this.allCourses.filter(course => course.status?.label?.toLowerCase() === this.selectedStatus?.id);
      }
      else {
        this.filteredCourses = [...this.allCourses];
      }
    }
  }

  deleteCourse(event: Event, course: Course) {
    this.confirmationService.confirm({
      target: event.target as EventTarget ?? null,
      message: 'Do you want to delete this Course?',
      header: 'Delete!',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },

      accept: () => {
        this.confirmDeleteCourse(course)
      },
    });
  }

  confirmDeleteCourse(course: Course) {
    const courseId = Number(course.id)
    this.coursesService.deleteCourse(courseId).subscribe({
      next: (res => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Course deleted' });
        this.getAllCourses()
      }),
      error: (err => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Course delete fail' });
      })
    })
  }
}
