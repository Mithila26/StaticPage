import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:3004/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  login(login: any): Observable<any> {
    return this.http.post(this.url + '/login', login);
  }

  signUp(details: any): Observable<any> {
    return this.http.post(this.url + '/signUp', details);
  }

  resetPassword(details: any): Observable<any> {
    return this.http.put(this.url + '/resetPassword', details);
  }

  addPremium(details: any): Observable<any> {
    return this.http.put(this.url + '/updatePremium', details);
  }

}
