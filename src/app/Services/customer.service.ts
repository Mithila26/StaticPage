import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  login(login: any): Observable<any> {
    let url = "http://localhost:3000/user/login";
    return this.http.post(url, login);
  }

  signUp(details: any): Observable<any> {
    let url = "http://localhost:3000/user/signUp";
    return this.http.post(url, details);
  }

  resetPassword(details: any): Observable<any> {
    let url = "http://localhost:3000/user/resetPassword";
    return this.http.patch(url, details);
  }

}
