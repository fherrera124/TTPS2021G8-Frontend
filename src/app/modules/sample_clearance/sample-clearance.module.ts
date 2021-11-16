import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import { SampleClearanceRoutingModule } from './sample-clearance-routing.module';
import { SampleClearanceComponent } from './sample-clearance.component';
import { SampleClearanceListComponent } from './sample-clearance-list/sample-clearance-list.component';


@NgModule({
  declarations: [
    SampleClearanceComponent,
    SampleClearanceListComponent
  ],
  imports: [
    CommonModule,
    SampleClearanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule,
    MatIconModule
   
  ],
  entryComponents: [
    SampleClearanceListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SampleClearanceModule {}
