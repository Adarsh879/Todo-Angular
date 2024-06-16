import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthStatus, UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,LoginComponent, SignupComponent, HomePageComponent, RouterLink, RouterLinkActive],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-app';

  //routing based on login
  constructor(private userService: UserService, private router: Router) {
  }
}
