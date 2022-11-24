import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  isSubmitted = false;

  // City Names
  City: any = ['Verified', 'Adjudicated', 'Processed', 'Settled' , 'Denied']

  constructor(public fb: FormBuilder) { }

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    statusName: ['', [Validators.required]]
  })


  // Choose city using select dropdown
  changeCity(e : String) : void {
    console.log(e.valueOf)
   // this.cityName!.setValue(e.target.value, {
   //   onlySelf: true
  //  })
  }

  // Getter method to access formcontrols
  get cityName() {
    return this.registrationForm.get('statusName');
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }

  }

}
