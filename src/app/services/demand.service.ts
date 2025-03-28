import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  private apiUrl = 'http://localhost:5010';

  async getDemands(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(`${this.apiUrl}/Demandes`);
      const demands = response.data;
  
      const demandsWithSender = await Promise.all(demands.map(async (demand) => {
        const user = await this.getClientId(demand.id_user);
        return {
          ...demand,
          senderName: user ? `${user.nom_user} ${user.prenom_user}` : 'Unknown User'
        };
      }));
  
      return demandsWithSender;
    } catch (error) {
      console.error('Error fetching demands:', error);
      throw error;
    }
  }

  async getDemandsForClient(clientId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/Demandes`);
      return response.data.filter((demand: any) => demand.id_user === clientId);
    } catch (error) {
      console.error('Error fetching demands:', error);
      throw error;
    }
  }

  async createDemand(demandData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/Demandes`, demandData);
      return response.data;
    } catch (error) {
      console.error('Error creating demand:', error);
      throw error;
    }
  }

  async deleteDemand(idDemande: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.apiUrl}/Demandes/${idDemande}`);
      return response.status === 200;
    } catch (error) {
      console.error('Error deleting demand:', error);
      throw error;
    }
  }

  async getDemandById(idDemande: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/Demandes?id_demande=${idDemande}`);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching demand:', error);
      throw error;
    }
  }

  async getClientId(idClient : string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/Demandes?id_user=${idClient}`);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching demand', error);
      throw error;
    }
  }

  async addManagerNotification(senderId: string, demandId: string): Promise<void> {
    try {
        // Get the manager
        const manager = (await axios.get<any[]>(`${this.apiUrl}/Users?role=gestionnaire`)).data[0];

        // Get the sender's full name
        const sender = (await axios.get<any[]>(`${this.apiUrl}/Users?id_user=${senderId}`)).data[0];
        const senderName = `${sender.nom_user} ${sender.prenom_user}`;

        // Get the demand's creation date
        const demand = (await axios.get<any[]>(`${this.apiUrl}/Demandes?id_demande=${demandId}`)).data[0];
        const receivedDate = demand.date_demande;

        // Create notification
        const notification = {
            id: `notification-${Date.now()}`,
            senderId: senderId,
            message: `Nouvelle demande reçue par '${senderName}'`,
            receivedDate: receivedDate,
            read: false
        };

        // Add notification to manager
        manager.notifications.push(notification);

        // Update the manager's data
        await axios.patch(`${this.apiUrl}/Users/${manager.id}`, { notifications: manager.notifications });
    } catch (error) {
        console.error('Error adding manager notification:', error);
        throw error;
    }
  }

  async assignDemandToTechnician(demandId: string, technicianId: string): Promise<void> {
    try {
      await axios.patch(`${this.apiUrl}/Demandes/${demandId}`, { id_technician: technicianId });
    } catch (error) {
      console.error('Error assigning demand to technician:', error);
      throw error;
    }
  }
}