import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesModule } from './features/courses/courses-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoursesModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CM-dashboard');
}
