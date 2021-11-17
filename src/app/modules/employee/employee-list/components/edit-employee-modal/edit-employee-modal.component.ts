import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import {
  CustomDateParserFormatter,
} from "../../../../../_metronic/core";
import { ValidationErrors } from "src/app/modules/shared/validation-errors";
import { Employee } from "../../../_models/employee.model";
import { EmployeeService } from "../../../_services";

const EMPTY_EMPLOYEE = Employee.getEmpty();

@Component({
  selector: "app-edit-employee-modal",
  templateUrl: "./edit-employee-modal.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class EditEmployeeModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  employee: Employee;
  formGroup: FormGroup;
  validationErrors: ValidationErrors = new ValidationErrors();
  isPasswordErroneus = false;
  public error: string;

  private subscriptions: Subscription[] = [];
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    config: NgbDatepickerConfig
  ) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    let now = new Date();
    config.maxDate = { year: now.getFullYear(), month: 12, day: 31 };
  }
  ngOnInit(): void {
    this.isLoading$ = this.employeeService.isLoading$;
    this.employeeService.errorMessage$.subscribe( httpError => {
      if (httpError !==''){
        this.error = httpError
      }
    }
      );
      
    this.loadPatient();
  }

  loadPatient() {
    if (!this.id) {
      this.employee = EMPTY_EMPLOYEE;
      this.loadForm();
    } else {
      const sb = this.employeeService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_EMPLOYEE);
          })
        )
        .subscribe((employee: Employee) => {
          this.employee = employee;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      first_name: [
        this.employee.first_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      last_name: [
        this.employee.last_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      username: [
        this.employee.username,
        Validators.compose([Validators.required]),
      ],
      password: [
        this.employee.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
      ],
      retrypassword: [
        this.employee.retrypassword,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
      ],
    });
  }

  save() {
    let employee = new Employee();
    employee.id = this.employee.id;
    this.employee = employee.prepare(this.formGroup.value);
    if (this.employee.password !== this.employee.retrypassword){
      this.isPasswordErroneus = true;
      return;
    }
    
    if (this.employee.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.error = undefined;
    const sbUpdate = this.employeeService
      .update(this.employee)
      .subscribe((res) => 
                {      
                  if (res.id) {
                    this.employee = res;
                    this.modal.close();
                  }  

      
                }
      );
    this.subscriptions.push(sbUpdate);
  }

  create() {
    this.error = undefined;
    this.employee.is_active = true;
    const sbCreate = this.employeeService
      .create(this.employee)
      .subscribe((res: Employee) => 
        {
          if (res.id) {
            this.employee = res;
            this.modal.close();
          }  
          
        },
      )
      ;
    this.subscriptions.push(sbCreate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}

