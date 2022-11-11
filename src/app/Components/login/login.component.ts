import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = { email : '', password:''};
  message: String = '';

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  loginCheck(data:any) {
    console.log(this.login);
    data.reset();
    this.customerService.login(this.login).subscribe(response => {
      alert(JSON.stringify(response));
    })
  }

}
