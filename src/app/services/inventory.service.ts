import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:5010';

  async getInventory(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/Inventaire`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  async createInventoryEntry(inventoryData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/Inventaire`, inventoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating inventory entry:', error);
      throw error;
    }
  }
}