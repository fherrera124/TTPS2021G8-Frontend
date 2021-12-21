import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { StudyService } from 'src/app/modules/study/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

}
