import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../../employee/_services";
import { PatientService } from "../../patient/_services";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  password = "";
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.loadForm();
    this.returnUrl =this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  loadForm() {
    this.formGroup = this.fb.group({
      password: [
        this.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  save() {
    let pwd = this.formGroup.get("password").value;
    this.authService.forgotPassword(pwd).subscribe((r) => {
      let userloged = this.authService.currentUserValue;
      let param = { id: userloged.id, force_password_change: false };
      this.patientService.update(param).subscribe((res) => {
        this.router.navigate([this.returnUrl]);
      });
    });
  }
}
