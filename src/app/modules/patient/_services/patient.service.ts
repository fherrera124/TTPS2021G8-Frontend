import { Observable, of } from 'rxjs';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { HealthInsurance, Patient } from '../_models/patient.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends TableService<Patient> implements OnDestroy {
  API_URL = `${environment.apiUrl}/patients`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_URL)
  }

  createOpen(item: Patient): Observable<any> {
    return super.create(item,this.API_URL + '/open');
  }
}

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService extends TableService<HealthInsurance> implements OnDestroy {
  API_URL = `${environment.apiUrl}/health_insurances`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  
  getAll():Observable<HealthInsurance[]> {
     return this.http.get<HealthInsurance[]>(this.API_URL);
  } 
}
