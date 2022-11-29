import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  updateStatus(data: any): Observable<any> {
    console.log(JSON.stringify(data) + "in service")
    return this.http.post("http://localhost:3004/admin/updateStatus", data);
  }
}

