import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemandService } from '../../services/demand.service';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DemandCardComponent } from '../demand-card/demand-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'client-demands-list',
  standalone: true,
  imports: [CommonModule, DemandCardComponent],
  templateUrl: './client-demands-list.component.html',
  styleUrl: './client-demands-list.component.css'
})
export class ClientDemandsListComponent implements OnInit {
  demands: any[] = [];
  inventory: any[] = [];
  clientId: string = '';
  clientNom: string = '';
  clientPrenom: string = '';

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
        // Fetch all demands for the client
        const allDemands = await this.demandService.getDemandsForClient(this.clientId);
        
        // Sort demands by date in descending order (latest first)
        allDemands.sort((a, b) => new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime());
        
        // Assign all demands to the component property
        this.demands = allDemands;

        // Fetch inventory data
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
}
