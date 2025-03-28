import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DemandService } from './demand.service';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class AddDemandService {
  constructor(private authService: AuthService, private demandService: DemandService, private inventoryService: InventoryService) { }

  async createDemand(demandData: any): Promise<boolean> {
    const userData = this.authService.getCurrentUser();
    if (userData) {
      const newMaterialId = `materiel-${Date.now()}`;
      const newDemand = {
        id_demande: `demande-${userData.id_user}-${Date.now()}`,
        id_user: userData.id_user,
        id_materiel: newMaterialId, // Set id_materiel here
        date_demande: new Date().toISOString(),
        description_demande: demandData.description_demande,
        categorie: demandData.categorie,
        etat_demande: 'En attente',
        urgent: demandData.urgent,
        id_technicien: '',
        date_resolution: null,
        technicien_commentaire: null,
      };

      try {
        // Create the demand
        const demandResponse = await this.demandService.createDemand(newDemand);
        console.log('Demand sent successfully:', demandResponse);

        // Create the inventory entry
        const newMaterial = {
          id_materiel: newMaterialId, // Use the same id_materiel
          nom_materiel: demandData.nom_materiel,
          numSerie: '', // Initially empty
          etat: 'En panne', // Default state
          id_demande: newDemand.id_demande, // Link to the demand
        };

        const inventoryResponse = await this.inventoryService.createInventoryEntry(newMaterial);
        console.log('Inventory updated:', inventoryResponse);

        await this.demandService.addManagerNotification(newDemand.id_user, newDemand.id_demande);

        return true;
      } catch (error) {
        console.error('Error sending demand or updating inventory:', error);
        throw error;
      }
    } else {
      console.error('User data not available');
      throw new Error('User data not available');
    }
  }
}