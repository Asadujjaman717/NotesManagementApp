import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://localhost:7249/api/auth/';

  constructor(private http:HttpClient) { }

  signup(userData:any):Observable<any>{
    return this.http.post(this.apiURL + 'signup', userData);
  }
  login(credentials: any): Observable<any> {
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('pass', credentials.pass);

    return this.http.post(this.apiURL + 'login', null, { params });
  }
  logout(sessionId:any):Observable<any>{
    console.log(sessionId + ' is the session id');
    return this.http.post(this.apiURL + 'logout', {}, {headers: {'sessionId': sessionId}});
  }
}
