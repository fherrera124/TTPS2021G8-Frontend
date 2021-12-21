import { Component, Injectable, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";


import { ValidationErrors } from "src/app/modules/shared/validation-errors";
import { Items } from "src/app/modules/shared/utils/items.model";
import { CustomDateParserFormatter } from "src/app/_metronic/core";
import { PatientService } from "../../patient/_services";
import { HealthInsuranceService } from "../../patient/_services/patient.service";
import { Patient } from "../../patient/_models/patient.model";
import { Router } from "@angular/router";

const EMPTY_PATIENT = Patient.getEmpty();

@Component({
  selector: "app-open-patient",
  templateUrl: "./open-patient.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CreateOpenPatientComponent implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  patient: Patient;
  formGroup: FormGroup;
  validationErrors: ValidationErrors = new ValidationErrors();
  
  private subscriptions: Subscription[] = [];
  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private healthInsuranceService: HealthInsuranceService,
    config: NgbDatepickerConfig,
    private router: Router
  ) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    let now = new Date();
    config.maxDate = { year: now.getFullYear(), month: 12, day: 31 };
  }
  ngOnInit(): void {
    this.isLoading$ = this.patientService.isLoading$;
    this.loadPatient();
  }

  loadPatient() {
    if (!this.id) {
      this.patient = EMPTY_PATIENT;
      this.loadForm();
    } else {
      const sb = this.patientService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            return of(EMPTY_PATIENT);
          })
        )
        .subscribe((patient: Patient) => {
          this.patient = patient;
          var date = new Date(this.patient.birth_date);
          this.patient.birth_date = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      first_name: [
        this.patient.first_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      last_name: [
        this.patient.last_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      dni: [
        this.patient.dni,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
      ],
      address: [
        // this.patient.adress,
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(50),
        ]),
      ],
      phone_number: [
        // this.patient.phone,
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ]),
      ],
      email: [
        this.patient.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      birth_date: [
        this.patient.birth_date,
        Validators.compose([Validators.required]),
      ],
      first_name_tutor: [
        this.patient.first_name_tutor,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      last_name_tutor: [
        this.patient.last_name_tutor,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  save() {
    let patient = new Patient();
    patient.id = this.patient.id;
    this.patient = patient.prepare(this.formGroup.value);

      this.create();

  }

  create() {
    this.patient.is_active = true;
    const sbCreate = this.patientService
      .createOpen(this.patient)
      .pipe(
        tap(() => {
        }),
        catchError((errorMessage) => {
          return of(this.patient);
        })
      )
      .subscribe((res: Patient) => {
        this.patient = res;
        this.router.navigateByUrl("auth/login");
      });
    this.subscriptions.push(sbCreate);
  }
  
  getSelectedItem(items: Items<string, any>[], id: number){
    if (items)
      return items.find(it=> it.value.id == id);
  }

  isAdult() {
    let bd = this.formGroup.get('birth_date').value;
    if (bd == null || bd == undefined)
      return true;

    let bdDate = new Date(bd.year,bd.month-1,bd.day);
    let timeDiff = Math.abs(Date.now() - bdDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    return age >= 18
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}