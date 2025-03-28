import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemandService } from '../../services/demand.service';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DemandCardComponent } from '../demand-card/demand-card.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'accueil-client',
  standalone: true,
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css'],
  imports: [CommonModule, DemandCardComponent, RouterLink]
})
export class AccueilClientComponent implements OnInit {
  demands: any[] = [];
  inventory: any[] = [];
  clientId: string = '';
  clientNom: string = '';
  clientPrenom: string = '';
  HomeBg = '/Images/Home page bg.jpg';

  private router = inject(Router);
  private authService = inject(AuthService);
  private demandService = inject(DemandService);
  private inventoryService = inject(InventoryService);

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    
    if (user) {
      this.clientId = user.id_user;
      this.clientNom = user.nom;
      this.clientPrenom = user.prenom;

      try {
        const allDemands = await this.demandService.getDemandsForClient(this.clientId);
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

  goToAddDemand() {
    this.router.navigate(['/add-demand']);
  }
}
