import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfiguratorService {
  API_URL = `${environment.apiUrl}/configurators/configuration/get`;
  API_URL_CONFIG_UPDATE = `${environment.apiUrl}/configurators/configuration/update`;
  constructor(public http: HttpClient) {}

  getConfigurator(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  updateConfigurations(mode: boolean): Observable<any> {
    let p = { obligated_mode: mode };
    return this.http.put(this.API_URL_CONFIG_UPDATE, p);
  }
}
