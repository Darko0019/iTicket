import { Component, Input, HostListener, ElementRef, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DemandService } from '../../services/demand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'demand-card',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './demand-card.component.html',
  styleUrls: ['./demand-card.component.css'],
})
export class DemandCardComponent {
  @Input() demand: any;
  @Input() inventory: any[] = [];
  CardBg = 'Images/Card bg.png';
  isDeleteBtnHovered = false;
  isDropdownOpen = false;

  private router = inject(Router)

  constructor(private demandService: DemandService, private elementRef: ElementRef) {}

  toggleDropdown() {
    console.log('Dropdown toggled:', this.isDropdownOpen);
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  async deleteDemand() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      try {
        // Use demand.id instead of demand.id_demande
        const success = await this.demandService.deleteDemand(this.demand.id);
        if (success) {
          alert('Demande supprimée avec succès !');
          // Refresh the list or update UI as needed
        } else {
          alert('Erreur lors de la suppression de la demande');
        }
      } catch (error) {
        console.error('Error deleting demand:', error);
        alert('Erreur lors de la suppression de la demande');
      }
    }
  }

  editDemand() {
    console.log('Edit demand:', this.demand);
    this.isDropdownOpen = false;
  }

  getMachineName(demand: any): string {
    const material = this.inventory.find((material) => material.id_materiel === demand.id_materiel);
    return material ? material.nom_materiel : 'Machine not found';
  }

  navigateToDemandDetails(idDemande: string) {
    // Navigate to the demand details page and pass the clientId in the state object
    this.router.navigate(['/client-demand-details', idDemande], { state: { clientId: this.demand.id_user } });
  }
}