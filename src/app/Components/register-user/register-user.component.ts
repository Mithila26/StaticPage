import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+[a-zA-Z]+')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}')]),
    gender: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    address: new FormControl('', [Validators.required]), age: new FormControl('', [Validators.required, Validators.min(18)]),
    dob: new FormControl('', [Validators.required]), isMarried: new FormControl('', [Validators.required]),
    spouseName: new FormControl('', [Validators.pattern('[a-zA-Z ]+[a-zA-Z]+')]), spouseAge: new FormControl('',),
    dependents: new FormArray([]),
    claimsDetails: new FormArray([]),
    role: new FormControl('user')
  })

  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService) { }

  dependents(): FormArray {
    return this.registerForm.get('dependents') as FormArray
  }

  newDependent(): FormGroup {
    return this.fb.group({
      relation: '',
      name: '',
      dependentAge: ''
    })
  }

  addDependents() {
    this.dependents().push(this.newDependent());
  }

  removeDependents(i: number) {
    this.dependents().removeAt(i);
  }

  ngOnInit(): void { }

  Submit() {
    this.customerService.signUp(this.registerForm.value).subscribe(response => {

      if (response.success == true) {
        Swal.fire(
          'Profile created!',
          'Login User Id: ' + response.data.email,
          'success'
        )
        this.router.navigate(['login']);
      }
    }, err => {
      if (err.error.success == false) {
        Swal.fire({
          icon: 'error',
          title: JSON.stringify(err.error.message),
          text: 'Please try with different email id'
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
