import { Component } from '@angular/core';
import { AddDemandService } from '../../services/addDemand.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css'],
  imports: [FormsModule]
})
export class DemandFormComponent {
  demandData = {
    nom_materiel: '',
    categorie: 'Hardware',
    description_demande: '',
    urgent: false,
  };

  constructor(private addDemandService: AddDemandService, private router: Router) { }

  async submitDemand() {
    try {
      if (!this.demandData.nom_materiel || !this.demandData.categorie || !this.demandData.description_demande || this.demandData.urgent === undefined) {
        alert('All fields are required');
        return;
      }

      const success = await this.addDemandService.createDemand(this.demandData);
      if (success) {
        alert('Demande envoyée avec succès !');
        this.router.navigate(['/accueil-client']);
      } else {
        alert('Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      console.error('Error sending demand:', error);
      alert('Erreur lors de l\'envoi de la demande');
    }
  }
  
  goBackToHome() {
    this.router.navigate(['/accueil-client']);
  }
}
