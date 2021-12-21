import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { ChartsModule } from 'ng2-charts';
import { MonthChartComponent } from './components/month-chart/month-chart.component';
import { TypeChartComponent } from './components/type-chart/type-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [DashboardComponent,MonthChartComponent,TypeChartComponent],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    DashboardsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
})
export class DashboardModule {}
