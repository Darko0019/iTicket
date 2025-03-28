import { Component, OnInit } from '@angular/core';
import { DemandService } from '../../services/demand.service';
import { DemandManagerComponent } from '../demand-manager/demand-manager.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'accueil-manager',
  standalone: true,
  templateUrl: './accueil-manager.component.html',
  styleUrls: ['./accueil-manager.component.css'],
  imports: [DemandManagerComponent, CommonModule, RouterLink]
})
export class AccueilManagerComponent implements OnInit {
  demands: any[] = [];
  managerNom: string = "";
  managerPrenom: string = "";

  constructor(private demandService: DemandService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user) {
      this.managerNom = user.nom;
      this.managerPrenom = user.prenom;
    } else {
      console.warn("Cannot find user data")
    }

    this.loadDemands();
  }

  loadDemands(): void {
    this.demandService.getDemands().then(demands => {
        this.demands = demands.sort((a, b) => new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime()).slice(0, 5);
    });
}
}
