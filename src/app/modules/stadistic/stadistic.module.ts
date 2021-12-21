import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MonthChartComponent } from './components/month-chart/month-chart.component';
import { TypeChartComponent } from './components/type-chart/type-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MonthChartComponent,
    TypeChartComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    MatDatepickerModule,
    MatButtonModule,
    ChartsModule
  ],
  exports: [
    MonthChartComponent,
    TypeChartComponent    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class StadisticModule {}
