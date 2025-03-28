// sidebar.service.ts
import { Injectable } from '@angular/core';
import sidebarLinks from '../assets/data/sidebar-links.json';
import { AuthService } from './auth.service';

interface SidebarLink {
  title: string;
  icon: string;
  routerLink: string;
}

interface SidebarLinks {
  links: Record<string, SidebarLink[]>;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _sidebarLinks: SidebarLinks = sidebarLinks;

  getSidebarLinks(): SidebarLink[] {
    const userRole = this.authService.getUserRole();

    if (!userRole) {
      console.log('User role is undefined. Returning empty array.');
      return [];
    }

    // Check if the user role matches a collection in the sidebar links
    const matchingRole = Object.keys(this._sidebarLinks.links).find(role => role === userRole);

    if (!matchingRole) {
      console.log(`No matching role found for user role: ${userRole}. Returning empty array.`);
      return [];
    }

    return this._sidebarLinks.links[matchingRole];
  }

  constructor(private authService: AuthService) {}
}