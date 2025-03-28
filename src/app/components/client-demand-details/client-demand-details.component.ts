import { Component, inject, OnInit } from '@angular/core';
import { DemandService } from '../../services/demand.service';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'client-demand-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-demand-details.component.html',
  styleUrl: './client-demand-details.component.css'
})
export class ClientDemandDetailsComponent implements OnInit {
  demand: any;
  inventory: any[] = [];
  CardBg = 'Images/Card bg.png';
  clientId: string = '';

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor(
    private route: ActivatedRoute,
    private demandService: DemandService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.clientId = user?.id_user || '';

    const idDemande = this.route.snapshot.paramMap.get('idDemande');
    
    if (idDemande) {
      this.demandService.getDemandById(idDemande).then(demand => {
        this.demand = demand;
        this.inventoryService.getInventory().then(inventory => {
          this.inventory = inventory;
        });
      });
    } else {
      console.error('No demand ID provided in the URL');
      this.router.navigate(['/accueil-client']);
    }
  }

  getMachineName(): string {
    const material = this.inventory?.find(m => m.id_materiel === this.demand?.id_materiel);
    return material?.nom_materiel || 'Machine not found';
  }

  goToHome() {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole()
      switch (userRole) {
        case 'client' :
          this.router.navigate(['/accueil-client']);
          break;
        case 'technicien' :
          this.router.navigate(['/accueil-thechnician']);
          break;
        case 'gestionnaire' :
          this.router.navigate(['/accueil-manager']);
          break;
        default :
          this.router.navigate(['/accueil-client']);
      }
    } else {
      console.error('No authenticated user');
      this.router.navigate(['/login']);
    }
  }
}