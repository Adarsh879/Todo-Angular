import { Component } from '@angular/core';
import { AuthOutcome, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { on } from 'events';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;
  authOutcome? : AuthOutcome;
  constructor(private userService: UserService,private router: Router) {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const user = this.signUpForm.value;
    this.userService.signup(user).then((authOutcome: AuthOutcome) => {
      this.authOutcome = authOutcome;
      if(authOutcome == AuthOutcome.Success){
        this.router.navigate(['/home']);
      }
    }).catch((authOutcome: AuthOutcome) => {
      this.authOutcome = authOutcome;
    });
  }
}
