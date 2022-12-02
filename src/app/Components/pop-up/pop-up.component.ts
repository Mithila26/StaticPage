import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.services';
import Swal from 'sweetalert2';
import { PopUp1Component } from '../PopUp1/pop-up1.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  Status = [{ "name": "Verified" }, { "name": "Adjudicated" }, { "name": "Processed" }, { "name": "Settled" }, { "name": "Denied" }]
  statusName!: string;
  selStatus!: String;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private dialogData: any, private adminService: ApiService, private dialRef: PopUp1Component, private route: Router) { }

  statusForm = this.fb.group({
    statusName: ['', [Validators.required]]
  })

  ngOnInit() { }

  onChange(newValue: any) {
    this.selStatus = newValue.name;
  }

  onSubmit() {
    let data = {
      claimId: this.dialogData.claimId,
      email: this.dialogData.email,
      claimStatus: this.selStatus
    }

    this.adminService.updateStatus(data).subscribe((data) => {
      this.dialRef.cancelDialog();
      window.location.reload();
    }, err => {
      if (err.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Please LogIn Again'
        })
        this.route.navigate(['logout']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    });
  }

}
