import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";
import { AuthService, UserModel } from "src/app/modules/auth";
import { AuthModel } from "src/app/modules/auth/_models/auth.model";
import { ConfiguratorService } from "src/app/modules/shared/service/configurator.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user: UserModel;
  role: string;
  isChecked: boolean;
  showAlert: boolean;

  constructor(
    private authService: AuthService,
    private configService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getAuthFromLocalStorage().role;
    this.user = this.authService.currentUserValue;
    this.configService.getConfigurator().subscribe(res => {
      res.obligated_mode = true;
      this.isChecked = res.obligated_mode;
    })
    
  }

  isEmployee() {
    return this.role == "EMPLOYEE";
  }

  isConfigurator() {
    return this.role == "CONFIGURATOR";
  }
  save() {
    this.configService.updateConfigurations(this.isChecked).subscribe((x) => {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    });
  }
}
