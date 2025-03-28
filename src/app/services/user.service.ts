import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5010';

  async getClients(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(`${this.apiUrl}/Users?role=client`);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  async getTechnicians(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(`${this.apiUrl}/Users?role=technicien`);
      return response.data;
    } catch (error) {
      console.error('Error fetching technicians:', error);
      return [];
    }
  }
}