import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  sidebarLinks: any[] = [];
  isSidebarOpen = false;
  isProfileOverlayOpen = false;
  isNotificationOverlayOpen = false;
  notifications: any[] = [];
  unreadNotificationsCount = 0;

  private authService = inject(AuthService);

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarLinks = this.sidebarService.getSidebarLinks();
    this.loadNotifications();
    const header = document.querySelector('.header');
    const welcomeContainer = document.querySelector('.welcome-container');

    if (header && welcomeContainer) {
      const welcomeHeight = welcomeContainer.clientHeight;

      window.addEventListener('scroll', () => {
        // Add 'scrolled' class when scroll exceeds welcome section height
        if (window.scrollY > welcomeHeight) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }

  ngAfterViewInit(): void {
    const headerElement = document.querySelector('.header-container') as HTMLElement;
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isProfileOverlayOpen = false;
  }

  toggleProfileOverlay() {
    this.isProfileOverlayOpen = !this.isProfileOverlayOpen;
    this.isSidebarOpen = false;
  }

  toggleNotificationOverlay() {
    this.isNotificationOverlayOpen = !this.isNotificationOverlayOpen;
    console.log("Notification overlay is open", this.isNotificationOverlayOpen);
  }

  logout() {
    this.authService.logout();
  }

  async loadNotifications(): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      try {
        const userData = await this.authService.getUserById(user.id_user);
        if (userData) {
          this.notifications = userData.notifications || [];
          this.unreadNotificationsCount = this.notifications.filter(notification => !notification.read).length;
          console.log(userData)
        } else {
          console.log("No data received from the current user");
          console.warn('User data is null or undefined');
          this.notifications = [];
          this.unreadNotificationsCount = 0;
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
        this.notifications = [];
        this.unreadNotificationsCount = 0;
      }
    }
  }
}