import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../architecture/utils/interfaces';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl: String = `${environment.baseUrl}/ap1/v1/users`;

  constructor(
    private _http: HttpClient,
  ) { }

  registerUser(userData: User): Observable<any> {
    console.log("USER DATA:::", userData)
    const userUrl = `${this.serverUrl}/register`;
    return this._http.post<any>(userUrl, userData);
  }

  //Login Uer
  logInUser(loginData: any, params: any): Observable<any> {
    const loginUrl = `${this.serverUrl}/signIn`;
    return this._http.post<any[]>(loginUrl, loginData, { params: params });
  }
}
