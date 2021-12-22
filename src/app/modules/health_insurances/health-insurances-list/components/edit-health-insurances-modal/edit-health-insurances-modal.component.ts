import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { HealthInsurance, HealthInsurances } from "../../../_models/health-insurances.model";
import {
  CustomDateParserFormatter,
  } from "../../../../../_metronic/core";
import { ValidationErrors } from "src/app/modules/shared/validation-errors";
import { Items } from "src/app/modules/shared/utils/items.model";
import { HealthInsurancesService } from "../../../_services/health-insurances.service";

const EMPTY_HEALTHINSURANCES = HealthInsurances.getEmpty();

@Component({
  selector: "app-edit-health-insurances-modal",
  templateUrl: "./edit-health-insurances-modal.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class EditHealthInsurancesModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  healthInsurances: HealthInsurances;
  formGroup: FormGroup;
  validationErrors: ValidationErrors = new ValidationErrors();
  public itemsHealthInsurance: Items<string, HealthInsurance>[]
  
  private subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private healthInsurancesService: HealthInsurancesService,
    config: NgbDatepickerConfig
  ) {
  }
  ngOnInit(): void {
    this.isLoading$ = this.healthInsurancesService.isLoading$;
    this.loadHealthInsurances();
  }

  loadHealthInsurances() {
    
    if (!this.id) {
      this.healthInsurances = EMPTY_HEALTHINSURANCES;
      this.loadForm();
    } else {
      const sb = this.healthInsurancesService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_HEALTHINSURANCES);
          })
        )
        .subscribe((healthInsurances: HealthInsurances) => {
          this.healthInsurances = healthInsurances;
          debugger;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: [
        this.healthInsurances.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      email: [
        this.healthInsurances.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      telephone: [
        this.healthInsurances.telephone,
        Validators.compose([Validators.required]),
      ],
    });
  }

  save() {
    let healthInsurances = new HealthInsurances();
    healthInsurances.id = this.healthInsurances.id;
    this.healthInsurances = healthInsurances.prepare(this.formGroup.value);
    if (this.healthInsurances.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.healthInsurancesService
      .update(this.healthInsurances)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.healthInsurances);
        })
      )
      .subscribe((res) => (this.healthInsurances = res));
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.healthInsurancesService
      .create(this.healthInsurances)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.healthInsurances);
        })
      )
      .subscribe((res: HealthInsurances) => (this.healthInsurances = res));
    this.subscriptions.push(sbCreate);
  }
  
  getSelectedItem(items: Items<string, any>[], id: number){
    if (items)
      return items.find(it=> it.value.id == id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}