import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPass = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}')]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: (control) => {
      if (control.value.password !== control.value.confirmPassword) {
        control.get('confirmPassword')?.setErrors({ notSame: true });
      }
      return null;
    }
  });

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  Submit() {
    this.customerService.resetPassword(this.forgotPass.value).subscribe(response => {

      if (response.success == true) {
        Swal.fire(
          response.message,
          'Login with new password',
          'success'
        )
        this.router.navigate(['login']);
      }
    }, err => {
      if (err.status == 404) {
        this.forgotPass.reset();
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          text: 'Please enter valid email id'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    })

  }

}
