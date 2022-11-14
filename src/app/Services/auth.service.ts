import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): String {

    return localStorage.getItem('token') || '{}';
  }

}
