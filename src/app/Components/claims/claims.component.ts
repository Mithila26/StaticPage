import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
  
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
})
export class ClaimsComponent implements OnInit {
  isLinear = true;
  //firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    amount: ['', Validators.required],
    stock: ['', Validators.required]
  });
  constructor(private _formBuilder: FormBuilder) {}

  

  ngOnInit(): void {
    /*this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      amount: ['', Validators.required],
      stock: ['', Validators.required]
    });*/
  }

  submit(){
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
}
}
