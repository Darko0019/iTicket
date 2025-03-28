import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  role: string = 'client';
  selectedDomain: string = ''; // Added for technician domain
  domains: string[] = ['Hardware', 'Software']; // Domain options

  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phoneNumber) {
      alert('Please fill in all required fields!');
      return;
    }
    this.signup();
  }

  async signup() {
    try {
      let domain = this.role === 'technicien' ? this.selectedDomain : ''; // Only pass domain for technicians

      const success = await this.authService.signup(
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.phoneNumber,
        this.role,
        domain 
      );

      if (!success) {
        alert('Error registering user! Please try again.');
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      alert('Error registering user! Please try again.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
