import { Component, OnInit } from '@angular/core';
import { DemandService } from '../../services/demand.service';
import { DemandManagerComponent } from '../demand-manager/demand-manager.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'manager-demands-list',
  standalone: true,
  templateUrl: './manager-demands-list.component.html',
  styleUrls: ['./manager-demands-list.component.css'],
  imports: [DemandManagerComponent, CommonModule]
})
export class ManagerDemandsListComponent implements OnInit {
  demands: any[] = [];

  constructor(private demandService: DemandService) {}

  ngOnInit(): void {

    this.loadDemands();
  }

  loadDemands(): void {
    this.demandService.getDemands().then(demands => {
        this.demands = demands.sort((a, b) => new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime());
    });
}
}