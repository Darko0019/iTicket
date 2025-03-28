import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // Login properties
  loginEmail: string = '';
  loginPassword: string = '';
  loginErrorMessage: string = '';
  isLoading: boolean = false;

  // Signup properties
  signupFirstName: string = '';
  signupLastName: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  signupConfirmPassword: string = '';
  signupPhoneNumber: string = '';
  signupRole: string = 'client';
  signupSelectedDomain: string = '';
  signupDomains: string[] = ['Hardware', 'Software', 'Networking', 'Security'];

  // Toggle between login and signup
  isLoginMode: boolean = true;

  private router = inject(Router);
  private authService = inject(AuthService);

  // Login method
  async onLoginSubmit() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginErrorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.loginErrorMessage = '';

    try {
      const success = await this.authService.login(this.loginEmail, this.loginPassword);
      if (success) {
        const user = this.authService.getCurrentUser();
        if (user) {
          switch (user.role) {
            case 'client':
              this.router.navigate(['/accueil-client']);
              break;
            case 'technicien':
              this.router.navigate(['/accueil-technician']);
              break;
            case 'gestionnaire':
              this.router.navigate(['/accueil-manager']);
              break;
            default:
              this.router.navigate(['/accueil-client']);
          }
        } else {
          this.loginErrorMessage = 'User data not available';
        }
      } else {
        this.loginErrorMessage = 'Invalid email or password';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.loginErrorMessage = 'Connection error. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  // Signup method
  async onSignupSubmit() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!this.signupFirstName || !this.signupLastName || !this.signupEmail || 
        !this.signupPassword || !this.signupPhoneNumber) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const domain = this.signupRole === 'technicien' ? this.signupSelectedDomain : '';

      const success = await this.authService.signup(
        this.signupEmail,
        this.signupPassword,
        this.signupFirstName,
        this.signupLastName,
        this.signupPhoneNumber,
        this.signupRole
      );

      if (!success) {
        alert('Error registering user! Please try again.');
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      alert('Error registering user! Please try again.');
    }
  }

  // Toggle between login and signup
  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    // Reset error messages and loading state
    this.loginErrorMessage = '';
    this.isLoading = false;
  }
}