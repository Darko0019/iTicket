import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    CommonModule, 
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  private router = inject(Router);
  private authService = inject(AuthService);

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
  
    try {
      const success = await this.authService.login(this.email, this.password);
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
          this.errorMessage = 'User data not available';
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'Connection error. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}