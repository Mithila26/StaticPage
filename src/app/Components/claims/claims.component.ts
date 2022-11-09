import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
//import { UserService } from '../app/Services/user.service';
//src/app/Services/user.service.ts
import { UserService } from 'src/app/Services/user.service';

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
  fourthFormGroup!: FormGroup;
  userFormDetails!: any;

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
  ) {}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      Name: ['', Validators.required],
      UserID: ['', Validators.required],
      email_address: ['', Validators.required],
      phone_number: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      county: ['', Validators.required],
      sub_county: ['', Validators.required],
      constituency: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      preferences: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      dependants: this._formBuilder.array([]),
    });
  }

  get dependants() {
    return this.fourthFormGroup.get('dependants') as FormArray;
  }

  newDependant(): FormGroup {
    return this._formBuilder.group({
      first_name: '',
      age: '',
    });
  }

  addDependant() {
    const dependant = new FormControl('');
    this.dependants.push(this.newDependant());
    //console.log(this.dependants.value);
  }

  removeDependant(index: number) {
    this.dependants.removeAt(index);
    //console.log(this.dependants.value);
  }

  submit() {
    this.userFormDetails = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value,
    };
    //this.userService.adduser(this.userFormDetails);
    console.log(this.userFormDetails);
  }
}
