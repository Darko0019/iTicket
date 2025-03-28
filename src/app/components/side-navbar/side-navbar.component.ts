import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'side-navbar',
  standalone: true,
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
  imports: [CommonModule, RouterLink]
})
export class SideNavbarComponent implements OnInit {
  sidebarLinks: any[] = [];
  isSidebarOpen = false;
  isCollapsed = true;

  private sidebarService = inject(SidebarService);

  constructor() {}

  ngOnInit(): void {
    this.sidebarLinks = this.sidebarService.getSidebarLinks();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}