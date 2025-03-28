import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manager-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {
  clients: any[] = [];
  technicians: any[] = [];
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.clients = await this.userService.getClients();
    this.technicians = await this.userService.getTechnicians();
  }
}