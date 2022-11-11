import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/ModelClasses/customer';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register(validate: any) {
    alert(JSON.stringify(this.customer));
    validate.reset();
    // this.customerService.register(this.customer).subscribe(response => {
    //   alert(JSON.stringify(response));
    //   this.router.navigate(['home']);
    // })
  }
}
