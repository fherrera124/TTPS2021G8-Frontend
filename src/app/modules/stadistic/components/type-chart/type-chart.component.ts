import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { StudyService } from 'src/app/modules/study/_services';

@Component({
  selector: 'type-chart',
  templateUrl: './type-chart.component.html'
})
export class TypeChartComponent implements OnInit {
  private changeDetectorRef: ChangeDetectorRef;
  @ViewChild(BaseChartDirective) typeChart: BaseChartDirective;

  public perTypeOptions: ChartOptions = {
    responsive: true,
  };
  public perTypeLabels: Label[] = [];
  public perTypeChartType: ChartType = 'bar';
  public perTypeLegend = false;
  public perTypePlugins = [];
  public perTypeData: ChartDataSets[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  constructor(private studyService: StudyService, injector: Injector) {
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    this.studyService.typesAmount().subscribe(result => 
      {
        this.perTypeLabels = result.map(r => r.study_type);
        this.perTypeData = [{data: result.map(r => r.amount), label: '' }]
        this.changeDetectorRef.detectChanges();
        this.typeChart.chart.update()
      })
  }

  changeType(type: ChartType) {
    this.perTypeChartType = type;
  }

}
