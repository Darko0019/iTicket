import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AccueilClientComponent } from './components/accueil-client/accueil-client.component';
import { AccueilManagerComponent } from './components/accueil-manager/accueil-manager.component';
import { AccueilTechnicianComponent } from './components/accueil-technician/accueil-technician.component';
import { DemandFormComponent } from './components/demand-form/demand-form.component';
import { AuthGuard } from './services/auth.guard';
import { ClientDemandDetailsComponent } from './components/client-demand-details/client-demand-details.component';
import { ClientDemandsListComponent } from './components/client-demands-list/client-demands-list.component';
import { ManagerUsersComponent } from './components/manager-users/manager-users.component';
import { ManagerDemandsListComponent } from './components/manager-demands-list/manager-demands-list.component';
import { ManagerDemandDetailsComponent } from './components/manager-demand-details/manager-demand-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/check-auth', // Redirect to the auth check route
    pathMatch: 'full'
  },
  {
    path: 'check-auth',
    component: LoginComponent, // You can redirect from the AuthGuard
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  {
    path: '',
    children: [
      { 
        path: 'accueil-client', 
        component: AccueilClientComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      { 
        path: 'accueil-manager', 
        component: AccueilManagerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['gestionnaire'] }
      },
      {
        path: 'accueil-technician',
        component: AccueilTechnicianComponent,
        canActivate: [AuthGuard],
        data: { roles: ['technicien'] }
      },
    
      {
        path: 'add-demand',
        component: DemandFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'client-demand-details/:idDemande',
        component: ClientDemandDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'manager-demand-details/:idDemande',
        component: ManagerDemandDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['gestionnaire'] }
      },
      {
        path: 'client-demands-list',
        component: ClientDemandsListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'manager-demands-list',
        component: ManagerDemandsListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['gestionnaire'] }
      },
      {
        path: 'manager-users',
        component: ManagerUsersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['gestionnaire'] }
      }
    ]
  },

  { path: '**', redirectTo: '/login' }
];