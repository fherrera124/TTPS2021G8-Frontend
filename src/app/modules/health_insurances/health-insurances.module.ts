import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditHealthInsurancesModalComponent } from './health-insurances-list/components/edit-health-insurances-modal/edit-health-insurances-modal.component';
import { HealthInsurancesListComponent } from './health-insurances-list/health-insurances-list.component';
import { SharedModule } from '../shared/shared.module';
import { HealthInsurancesComponent } from './health-insurances.component';
import { HealthInsurancesRoutingModule } from './health-insurances-routing.module';


@NgModule({
  declarations: [
    HealthInsurancesComponent,
    HealthInsurancesListComponent,
    EditHealthInsurancesModalComponent,
  ],
  imports: [
    CommonModule,
    HealthInsurancesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule
  ],
  entryComponents: [
    EditHealthInsurancesModalComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class HealthInsurancesModule {}
