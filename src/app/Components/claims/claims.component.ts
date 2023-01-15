import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  local = localStorage.getItem('user');
  isLinear = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  public claimObj: any;

  claimsDetails: any = new FormArray([])
  ID = Math.round(Math.random() * 900000).toString();
  source: any = [];
  dependantsData: any = [];
  phone:any;
  email:any;
  premium:any;
  coverage:any;
  balance:any;
  
  constructor(private router: Router, private _formBuilder: FormBuilder, private api: ApiService,private adminAPIservice: ApiService) { }

  ngOnInit() {
    this.dependantsData.push(this.local);

    this.adminAPIservice.getUserDetails().subscribe((data: any) => {
      this.source = data;  
      this.source.forEach((depend: any) => {
        this.phone=(depend.contact);
        this.email=depend.email;
      this.premium= depend.totalPremium;
      this.coverage=depend.totalCoverage;
      this.balance=depend.totalBalance }) 
         this.source.forEach((depend: any) => {
          depend.dependents.forEach((element: any) => {
          this.dependantsData.push(element.name);
        });}) 
    })   
    
    this.firstFormGroup = this._formBuilder.group({
      Patientname: ['', [Validators.required]],
      ClaimNum: [{ value: this.ID, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      AgencyNum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      PatientID: ['', [Validators.required]],
      Patientcontact: [{ value: this.phone, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      Patientemail: [{ value: this.email, disabled: true }, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });

    this.secondFormGroup = this._formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Treatment: ['', Validators.required],
      PolDur: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      PolAmt: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Eligible: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });

    this.thirdFormGroup = this._formBuilder.group({    
      ClaimAmt: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Coverage: [{ value: this.coverage, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      Premium: [{ value: this.premium, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      StatDate: ['', Validators.required],
      CurrentBalance: [{value:'', disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      Balance: [{value:'', disabled: true }],
      DueDate: ['', Validators.required],
      Payment: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  logout() {
    Swal.fire({
      text: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign Out'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['logout']);
      }
    })
  }

  submit() {
    this.claimObj = {
      ClaimNum: this.firstFormGroup.getRawValue().ClaimNum,
      AgencyNum: this.firstFormGroup.value.AgencyNum,
      PatientID: this.firstFormGroup.value.PatientID,
      Patientname: this.firstFormGroup.value.Patientname,
      Patientcontact: this.phone,
      StartDate: this.secondFormGroup.value.StartDate,
      EndDate: this.secondFormGroup.value.EndDate,
      Treatment: this.secondFormGroup.value.Treatment,
      PolDur: this.secondFormGroup.value.PolDur,
      PolAmt: this.secondFormGroup.value.PolAmt,
      Eligible: this.secondFormGroup.value.Eligible,
      ClaimAmt: this.thirdFormGroup.value.ClaimAmt,
      Coverage: this.coverage,
      Premium: this.thirdFormGroup.value.Premium,
      StatDate: this.thirdFormGroup.value.StatDate,
      Balance: this.balance-this.thirdFormGroup.value.ClaimAmt,
      DueDate: this.thirdFormGroup.value.DueDate,
      Payment: this.thirdFormGroup.value.Payment,
      Patientemail: this.email,
      CurrentBalance:this.balance,
      claimStatus: "Requested"
    };

    this.api.registerClaim(this.claimObj).subscribe(response => {

      if (response.success == true) {
        Swal.fire({
          icon: 'success',
          text: 'Your claim request has been created. Have a good Day!'
        })
        this.router.navigate(['userView']);
      }
    }, err => {
      if (err.error.success == false) {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Please LogIn Again'
        })
        this.router.navigate(['logout']);
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
