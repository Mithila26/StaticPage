import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
  
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.services';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  isLinear = true;  

  public claimObj={ClaimNum:'',AgencyNum :'', ID:'',
  name: '',contact: '',StartDate:'', EndDate:'', Treatment:'',PolDur:'',
  PolAmt:'', Eligible:'',ClaimAmt:'',Coverage:'',Premium:'', StatDate:'',
  DueAmt:'',Balance:'',DueDate:'',Payment:'', email:''};

  login = { email: '', password: '' };
  
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    ClaimNum: ['', Validators.required],
    AgencyNum: ['', Validators.required],
    ID: ['', Validators.required],
    contact: ['', [Validators.required,Validators.pattern('[0-9]*')]],
    email: ['', [Validators.required]]
  });
  secondFormGroup = this._formBuilder.group({
    StartDate: ['', Validators.required],
    EndDate: ['', Validators.required],
    Treatment: ['', Validators.required],
    PolDur: ['', Validators.required],
    PolAmt: ['', Validators.required],
    Eligible: ['', Validators.required]
    
    
  });

  thirdFormGroup = this._formBuilder.group({
    
    ClaimAmt: ['', Validators.required],
    Coverage: ['', Validators.required],
    Premium: ['', Validators.required],
    StatDate: ['', Validators.required],
    DueAmt: ['', Validators.required],
    Balance: ['', Validators.required],
    DueDate: ['', Validators.required],    
    Payment: ['', Validators.required]

  });
  constructor(private router: Router, private _formBuilder: FormBuilder, private api: ApiService,private customerService: CustomerService ) {}

  

  ngOnInit(): void {
    
  }

  

submit(validate: any) {
  console.log("claim obj",this.claimObj);
  this.api.registerClaim(this.claimObj).subscribe(response => {
    console.log('submit',response);
    Swal.fire({
      text: 'Your claim request has been created. Have a good Day!'
  })
     this.router.navigate(['home']);
  }, err =>{
     if(err.error.success == false){
      Swal.fire({
        icon:'error',
        title: JSON.stringify(err.error.message),
        text: 'Please try Again'
    })
    }else{
      Swal.fire({
        icon:'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
    }  
  })
}
  

  

}
