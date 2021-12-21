import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../_models/user.model";
import { environment } from "../../../../../environments/environment";
import { AuthModel } from "../../_models/auth.model";

const API_USERS_URL = `${environment.apiUrl}/login`;
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(protected http: HttpClient) {}

  // public methods
  login(username: string, password: string): Observable<any> {
    var formData: any = new FormData();
    formData.append("password", password);
    formData.append("username", username);
    return this.http.post<AuthModel>(`${API_USERS_URL}/access-token`, formData);
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(pwd: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/reset-password`,pwd);
  }

  getUserByToken(token): Observable<UserModel> {
    return this.http.get<UserModel>(API_USERS_URL + '/user-by-token');
  }
}
