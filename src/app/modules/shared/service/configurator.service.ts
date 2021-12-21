import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  API_URL = `${environment.apiUrl}/configurators/configuration/get`;
  constructor(public http: HttpClient) {
  }

  getConfigurator(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
