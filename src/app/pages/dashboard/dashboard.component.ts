import { Component, OnInit } from '@angular/core';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { AuthModel } from 'src/app/modules/auth/_models/auth.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:UserModel
  role: string;

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.role = this.authService.getAuthFromLocalStorage().role;
    this.user = this.authService.currentUserValue;
  }

  isEmployee() {
    return this.role == "EMPLOYEE";
  }

}
