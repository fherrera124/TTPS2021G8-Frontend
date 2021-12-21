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
}

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService extends TableService<HealthInsurance> implements OnDestroy {
  API_URL = `${environment.apiUrl}/health_insurance`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  
  getAll():Observable<HealthInsurance[]> {
     return of([{id: 1, name:'OSDE'}, {id: 2, name:'IOMA'}])
    // return this.http.get<HealthInsurance[]>(this.API_URL);
  } 
}
