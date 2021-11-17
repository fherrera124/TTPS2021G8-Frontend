import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { ValidationErrors } from "src/app/modules/shared/validation-errors";
import { ReferringPhysicianService } from "src/app/modules/referring_physician/_services";
import { ReferringPhysician } from "src/app/modules/referring_physician/_models/referring-physician.model";
import { CrudOperation } from "src/app/modules/shared/utils/crud-operation.model";

const EMPTY_REFERRING_PHYSICIAN = ReferringPhysician.getEmpty();

@Component({
  selector: "app-edit-referring-physician-modal",
  templateUrl: "./edit-referring-physician-modal.component.html",
})
export class EditReferringPhysicianModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  referringPhysician: ReferringPhysician;
  formGroup: FormGroup;
  validationErrors: ValidationErrors = new ValidationErrors();
  private subscriptions: Subscription[] = [];
  public error: string;
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    config: NgbDatepickerConfig,
    private referringPhysicianService: ReferringPhysicianService,
  ) {}
  
  ngOnInit(): void {
    this.error = undefined;
    this.isLoading$ = this.referringPhysicianService.isLoading$;
    this.referringPhysicianService.errorMessage$.subscribe( httpError => {
      if (httpError !==''){
        this.error = httpError
      }
    }
      );
  
    this.loadReferringPhysician();
  }

  loadReferringPhysician() {
    if (!this.id) {
      this.referringPhysician = EMPTY_REFERRING_PHYSICIAN;
      this.loadForm();
    } else {
      const sb = this.referringPhysicianService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_REFERRING_PHYSICIAN);
          })
        )
        .subscribe((referringPhysician: ReferringPhysician) => {
          this.referringPhysician = referringPhysician;
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      first_name: [
        this.referringPhysician.first_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      last_name: [
        this.referringPhysician.last_name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      email: [
        this.referringPhysician.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      license: [
        this.referringPhysician.license,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(9),
        ]),
      ],
      phone: [
        this.referringPhysician.phone,
        Validators.compose([Validators.maxLength(12)]),
      ]
    });
  }

  save() {
    let referringPhysician = new ReferringPhysician();
    referringPhysician.id = this.referringPhysician.id;
    this.referringPhysician = referringPhysician.prepare(this.formGroup.value);
    if (this.referringPhysician.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.referringPhysicianService
      .update(this.referringPhysician)
      .subscribe((res: ReferringPhysician) => 
      {
        console.log(res);
        if (res.id) {
          this.referringPhysician = res
          this.modal.close();
        }  
      }
    );
    this.subscriptions.push(sbUpdate);
  }

  create() {
    this.error = undefined;
    const sbCreate = this.referringPhysicianService
      .create(this.referringPhysician)
      .subscribe((res: ReferringPhysician) => 
      {
        if (res.id) {
          this.referringPhysician = res
          this.modal.close();
        }  
      }
    );
    this.subscriptions.push(sbCreate);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}