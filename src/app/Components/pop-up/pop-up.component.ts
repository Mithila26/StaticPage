import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { PopUp1Component } from '../PopUp1/pop-up1.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  isSubmitted = false;
  Status = [{ "name": "Verified" }, { "name": "Adjudicated" }, { "name": "Processed" }, { "name": "Settled" }, { "name": "Denied" }]
  statusName!: string;
  selStatus!: String;


  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, public adminService: AdminService, public dialRef: PopUp1Component) { }

  /*########### Form ###########*/
  statusForm = this.fb.group({
    statusName: ['', [Validators.required]]
  })
  // statusName=this.Status[1]
  ngOnInit() {
  }

  onChange(newValue: any) {
    // console.log(JSON.stringify(newValue) + " !!!!####!!!!");
    this.selStatus = newValue.name;
  }
  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    let data = {
      claimId: this.dialogData.claimId,
      email: this.dialogData.email,
      claimStatus: this.selStatus
    }
    console.log(data)
    this.adminService.updateStatus(data).subscribe((data) => {
      this.dialRef.cancelDialog();
      window.location.reload();
    }
    );

  }

}
