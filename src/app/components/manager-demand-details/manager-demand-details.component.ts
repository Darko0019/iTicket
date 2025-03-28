import { Component } from '@angular/core';
import { ClientDemandDetailsComponent } from '../client-demand-details/client-demand-details.component';

@Component({
  selector: 'manager-demand-details',
  standalone: true,
  imports: [ClientDemandDetailsComponent],
  templateUrl: './manager-demand-details.component.html',
  styleUrl: './manager-demand-details.component.css'
})
export class ManagerDemandDetailsComponent {
  
}
