import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLogin: boolean = true;
  email = '';
  password = '';
  sessionId:string | null = null;
  user = { name: '', email: '', dob: '', pass: '' };

  constructor(private authService:AuthService, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    this.authService.login({ email: this.email, pass: this.password }).subscribe(
      (response: any) => {
        this.sessionId = response.sessionId as string;
        localStorage.setItem('sessionId', this.sessionId);
        console.log(this.sessionId);
        this.router.navigate(['/dashboard'], { queryParams: { email: this.email } });
        alert('Login successful');
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed! Please check your credentials.');
      }
    );
  }

  logout(){
    if(!this.sessionId) return;
    this.authService.logout(this.sessionId).subscribe(() => {
      this.sessionId = null;
      alert('Logout successful');
      this.router.navigate(['/signup']);
    });
  }

  toggleForm() {
    this.router.navigate(['/signup']);
  }
}
