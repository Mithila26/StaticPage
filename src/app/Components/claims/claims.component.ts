import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
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
  isLinear = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  public claimObj: any;

  claimsDetails: any = new FormArray([])
  ID = Math.round(Math.random() * 900000).toString();

  constructor(private router: Router, private _formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      Patientname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+[a-zA-Z]+')]],
      ClaimNum: [{ value: this.ID, disabled: true }, [Validators.required, Validators.pattern('[0-9]*')]],
      AgencyNum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      PatientID: ['', [Validators.required]],
      Patientcontact: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Patientemail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
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
      Coverage: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Premium: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      StatDate: ['', Validators.required],
      DueAmt: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Balance: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      DueDate: ['', Validators.required],
      Payment: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  submit() {
    this.claimObj = {
      ClaimNum: this.firstFormGroup.getRawValue().ClaimNum,
      AgencyNum: this.firstFormGroup.value.AgencyNum,
      PatientID: this.firstFormGroup.value.PatientID,
      Patientname: this.firstFormGroup.value.Patientname,
      Patientcontact: this.firstFormGroup.value.Patientcontact,
      StartDate: this.secondFormGroup.value.StartDate,
      EndDate: this.secondFormGroup.value.EndDate,
      Treatment: this.secondFormGroup.value.Treatment,
      PolDur: this.secondFormGroup.value.PolDur,
      PolAmt: this.secondFormGroup.value.PolAmt,
      Eligible: this.secondFormGroup.value.Eligible,
      ClaimAmt: this.thirdFormGroup.value.ClaimAmt,
      Coverage: this.thirdFormGroup.value.Coverage,
      Premium: this.thirdFormGroup.value.Premium,
      StatDate: this.thirdFormGroup.value.StatDate,
      DueAmt: this.thirdFormGroup.value.DueAmt,
      Balance: this.thirdFormGroup.value.Balance,
      DueDate: this.thirdFormGroup.value.DueDate,
      Payment: this.thirdFormGroup.value.Payment,
      Patientemail: this.firstFormGroup.value.Patientemail,
      claimStatus: "Requested"
    };
    alert(JSON.stringify(this.claimObj));
    console.log(this.claimObj);
    this.api.registerClaim(this.claimObj).subscribe(response => {

      if (response.success == true) {
        Swal.fire({
          text: 'Your claim request has been created. Have a good Day!'
        })
        this.router.navigate(['home']);
      }
    }, err => {
      if (err.error.success == false) {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Please LogIn Again'
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
