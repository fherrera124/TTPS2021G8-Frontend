import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { StudyService } from 'src/app/modules/study/_services';

@Component({
  selector: 'month-chart',
  templateUrl: './month-chart.component.html'
})
export class MonthChartComponent implements OnInit {
  private changeDetectorRef: ChangeDetectorRef;
  @ViewChild(BaseChartDirective) monthChart: BaseChartDirective;
  public chartTypeSelected = '';
  public perMonthOptions: ChartOptions = {
  };
  public perMonthLabels: Label[] = [];
  public perMonthChartType: ChartType = 'line';
  public perMonthLegend = false;
  public perMonthPlugins = [];
  public perMonthData: any[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];


  constructor(private studyService: StudyService, injector: Injector) {
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
      this.studyService.monthsAmount().subscribe(result => 
        {
          this.perMonthLabels = result.map(r => r.month);
          this.perMonthData = [{data: result.map(r => r.amount), label: '' }]
          this.changeDetectorRef.detectChanges();
          this.monthChart.chart.update()
        })
  }

  changeType(type: ChartType) {
    this.perMonthChartType = type;
  }



}
