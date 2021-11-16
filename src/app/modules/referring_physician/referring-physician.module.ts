import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ReferringPhysicianRoutingModule } from './referring-physician-routing.module';
import { ReferringPhysicianListComponent } from './referring-physician-list/referring-physician-list.component';
import { ReferringPhysicianComponent } from './referring-physician.component';
import { EditReferringPhysicianModalComponent } from './referring-physician-list/components/edit-referring-physician-modal/edit-referring-physician-modal.component';


@NgModule({
  declarations: [
    ReferringPhysicianComponent,
    ReferringPhysicianListComponent,
    EditReferringPhysicianModalComponent
  ],
  imports: [
    CommonModule,
    ReferringPhysicianRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule,
  ],
  entryComponents: [
    ReferringPhysicianListComponent,
    EditReferringPhysicianModalComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ReferringPhysicianModule {}
