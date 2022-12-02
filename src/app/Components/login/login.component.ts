import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = { email: '', password: '' };

  constructor(private router: Router, private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, { width: '250px', closeOnNavigation: true });
  }

  loginCheck() {
    this.customerService.login(this.login).subscribe(response => {
      if (response.success == true) {

        localStorage.setItem('token', response.data.token);

        if (response.data.role == 'user') {
          this.router.navigate(['userView']);
        } else if (response.data.role == 'admin') {
          this.router.navigate(['adminView']);
        } else {
          this.router.navigate(['home']);
        }

      }
    }, err => {
      if (err.error.success == false) {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect User Id or Password',
          text: 'Please try again with correct credationals'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!,Please try again'
        })
      }
    })
  }
}
