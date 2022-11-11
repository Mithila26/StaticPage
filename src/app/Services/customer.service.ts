import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  cust: any;

  constructor(private http:HttpClient) { }

  login(login: any) {
    let url = "http://localhost:3000/user/login";
    return this.http.post(url, login); 
  }

}
