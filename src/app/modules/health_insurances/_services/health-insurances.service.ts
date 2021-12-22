import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { environment } from '../../../../environments/environment';
import { HealthInsurances } from '../_models/health-insurances.model';

@Injectable({
  providedIn: 'root'
})
export class HealthInsurancesService extends TableService<HealthInsurances> implements OnDestroy { 
  API_URL = `${environment.apiUrl}/health_insurances`;
  
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  
}
