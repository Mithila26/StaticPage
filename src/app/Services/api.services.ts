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

  registerClaim(claimObj: any){
    this.http.post('http://localhost:3000/registerClaim',claimObj ).subscribe(res =>{
        console.log(res);
        this.message=res;
        return this.http.post('http://localhost:3000/registerClaim', claimObj); 
    });
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




}
