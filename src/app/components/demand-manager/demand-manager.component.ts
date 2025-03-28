import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../../services/auth.service';
import { DemandService } from '../../services/demand.service';

@Component({
  selector: 'demand-manager',
  standalone: true,
  templateUrl: './demand-manager.component.html',
  styleUrls: ['./demand-manager.component.css'],
  imports: [CommonModule]
})
export class DemandManagerComponent {
  @Input() demand: any;
  senderName: string = 'Loading...';
  defaultProfileImage = 'Images/User Profile default.png';
  showActions = false;
  showAssignModal = false; // Flag to show the assign modal
  technicians: any[] = []; // List of available technicians

  private authService = inject(AuthService);
  private demandService = inject(DemandService);
  private elementRef = inject(ElementRef);
  private router = inject(Router); // Inject Router for navigation

  ngOnInit(): void {
    this.loadSenderName(this.demand.id_user);
    this.loadTechnicians(); // Load available technicians
  }

  loadSenderName(userId: string): void {
    this.authService.getUserDataById(userId).then(user => {
      this.senderName = user ? `${user.nom_user} ${user.prenom_user}` : 'Unknown User';
    }).catch(() => {
      this.senderName = 'Unknown User';
    });
  }

  loadTechnicians(): void {
    this.authService.getTechnicians().then(technicians => {
      this.technicians = technicians;
    });
  }

  assignToTechnician(): void {
    this.showAssignModal = true; // Show the assign modal
  }

  assignDemandToTechnician(technicianId: string): void {
    this.demandService.assignDemandToTechnician(this.demand.id_demande, technicianId).then(() => {
      console.log('Demand assigned successfully');
      this.showAssignModal = false; // Hide the modal after assignment
    });
  }

  navigateToDetails(): void {
    // Navigate to details page with the demand ID as a route parameter
    this.router.navigate(['/manager-demand-details', this.demand.id_demande]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showActions = false;
    }
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }
}