import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3004/admin';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  registerClaim(claimObj: any): Observable<any> {
    let url = "http://localhost:3004/claims/registerClaim";
    return this.http.put(url, claimObj);
  }

  getDetails() {
    return this.http.get(this.url + '/details');
  }

  getUserDetails() {
    return this.http.get(this.url + '/userDetails');
  }

  updateStatus(data: any): Observable<any> {
    return this.http.put(this.url + '/updateStatus', data);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.length > 0) {
      return true;
    } else {
      alert('Please log in')
      this.router.navigate(['']);
      return false;
    }
  }

}
