import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EditEmployeeModalComponent } from './employee-list/components/edit-employee-modal/edit-employee-modal.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EditEmployeeModalComponent,
    EmployeeListComponent
    /*PatientListComponent,
    DeleteModalComponent,
    EditPatientModalComponent,*/
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
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
    EditEmployeeModalComponent,
    EmployeeListComponent
  /*  DeleteModalComponent,
    EditPatientModalComponent,*/
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class EmployeeModule {}
