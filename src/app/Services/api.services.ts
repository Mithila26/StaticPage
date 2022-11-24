import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
message: any;
 //public isLoggedIn: boolean = false;
  isLoggedIn: boolean | undefined;
constructor(private http: HttpClient,  private router: Router) { }

  getDataApi(){
    this.http.get('http://localhost:3000/get').subscribe(res =>{
        console.log(res);
        this.message=res;
    });
  }

  registerClaim(claimObj: any): Observable<any>{
    let url = "http://localhost:3000/claims/registerClaim";
    return this.http.post(url, claimObj); 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.length>0) {
      return true;
    } else {
      alert('Please log in')
      this.router.navigate(['']);
      return false;
    }
  }

  
  baseUri : string = "http://localhost:3000/admin/details";
  getDetails() {
    return this.http.get(`${this.baseUri}`);
  }

}
