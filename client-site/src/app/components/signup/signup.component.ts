import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    dob: '',
    pass: ''
  };
  isLogin: boolean = true;

  constructor(private authService: AuthService,
    private router: Router) {}

  signup() {
    console.log("Hello from signup");
    if (!this.user.name || !this.user.email || !this.user.dob || !this.user.pass) {
      alert('Please fill all fields');
      return;
    }

    this.authService.signup(this.user).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        alert('Signup successful');
      },
      (error) => {
        alert('Signup failed');
        console.error(error);
      }
    );
  }

  toggleForm() {
    this.router.navigate(['/login']);
  }
}
