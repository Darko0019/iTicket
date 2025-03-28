import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Check if route has data requiring specific role
      if (route.data['roles'] && route.data['roles'].length) {
        const userRole = this.authService.getUserRole();
        
        if (userRole && route.data['roles'].includes(userRole)) {
          return true;
        } else {
          // User doesn't have required role, redirect to appropriate page
          switch (userRole) {
            case 'client':
              this.router.navigate(['/accueil-client']);
              break;
            case 'technicien':
              this.router.navigate(['/accueil-technician']);
              break;
            case 'gestionnaire':
              this.router.navigate(['/accueil-manager']);
              break;
            default:
              this.router.navigate(['/login']);
          }
          return false;
        }
      }
      
      // No specific role required, user is authenticated
      return true;
    }
    
    // User is not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}