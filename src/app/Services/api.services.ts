import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, RouteConfigLoadEnd, Route } from '@angular/router';


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
    const {routeConfig}= route ;
    const {path}= routeConfig as Route;
    let role= localStorage.getItem('role');
    if (path?.includes("userView") && role === "User") {
      
      return true;
    } 
    if (path?.includes("claims") && role === "User") {
      
      return true;
    } 
    
    if (path?.includes("adminView") && role === "Admin") {
      return true;
    } else {
      alert('Please log in');
      localStorage.clear();
      this.router.navigate(['login']);
      return false;
    }
    
  }
}
