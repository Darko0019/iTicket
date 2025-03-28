import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemandService } from '../../services/demand.service';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DemandCardComponent } from '../demand-card/demand-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'accueil-technician',
  standalone: true,
  templateUrl: './accueil-technician.component.html',
  styleUrls: ['./accueil-technician.component.css'],
  imports: [CommonModule, DemandCardComponent, RouterLink]
})
export class AccueilTechnicianComponent implements OnInit {
  demands: any[] = [];
  inventory: any[] = [];
  technicianId: string = '';
  technicianNom: string = '';
  technicianPrenom: string = '';
  HomeBg = '/Images/Home page bg.jpg';

  private router = inject(Router);
  private authService = inject(AuthService);
  private demandService = inject(DemandService);
  private inventoryService = inject(InventoryService);

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    
    if (user) {
      this.technicianId = user.id_user;
      this.technicianNom = user.nom;
      this.technicianPrenom = user.prenom;

      try {
        const allDemands = await this.demandService.getDemandsForClient(this.technicianId);
        allDemands.sort((a, b) => new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime());
        this.demands = allDemands.slice(0, 6);
        
        this.inventory = await this.inventoryService.getInventory();
      } catch (error) {
        console.error('Error loading data:', error);
        this.router.navigate(['/login']);
      }
    } else {
      console.error('User not found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  goToAssignedDemands() {
    this.router.navigate(['/technician-assigned-demands']);
  }
}