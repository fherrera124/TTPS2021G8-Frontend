import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { OpenPatientComponent } from './open-patient.component';
import { CreateOpenPatientComponent } from './open-patient/open-patient.component';
import { OpenPatientRoutingModule } from './open-patient-routing.module';


@NgModule({
  declarations: [
    OpenPatientComponent,
    CreateOpenPatientComponent
  ],
  imports: [
    CommonModule,
    OpenPatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class OpenPatientModule {}
