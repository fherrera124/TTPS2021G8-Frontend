import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SampleClearance } from '../_model/sample-clearance.model';

@Injectable({
  providedIn: 'root'
})
export class SampleClearanceService extends TableService<SampleClearance> implements OnDestroy {
  API_URL = `${environment.apiUrl}/samples`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  
  registerSampleClearanceAsPay(samplesId: number[]): Observable<any> {
        return this.http.post(this.API_URL+'/mark-as-processed', samplesId);
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}

   

