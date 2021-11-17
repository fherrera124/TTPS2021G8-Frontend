import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { environment } from '../../../../environments/environment';
import { Employee } from '../_models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends TableService<Employee> implements OnDestroy {
  API_URL = `${environment.apiUrl}/employees`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
