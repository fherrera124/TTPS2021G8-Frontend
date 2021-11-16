import { Component, Injectable, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { Diagnosis, Study, StudyList, StudyState, TypeStudy } from "../../../_models/study.model";
import { StudyService } from "../../../_services";
import { ValidationErrors } from "src/app/modules/shared/validation-errors";
import { PatientService } from "src/app/modules/patient/_services";
import { Patient } from "src/app/modules/patient/_models/patient.model";
import { Items } from "src/app/modules/shared/utils/items.model";
import { DiagnosisService, StudyListService, TypeStudyService } from "../../../_services/study.service";
import { ReferringPhysicianService } from "src/app/modules/referring_physician/_services";
import { ReferringPhysician } from "src/app/modules/referring_physician/_models/referring-physician.model";
import { CrudOperation } from "src/app/modules/shared/utils/crud-operation.model";

const EMPTY_STUDY = Study.getEmpty();

@Component({
  selector: "app-detail-study-modal",
  templateUrl: "./detail-study-modal.component.html",
})
export class DetailStudyModalComponent {
  @Input() study: StudyList;
  constructor(public modal: NgbActiveModal ) {}
    
}