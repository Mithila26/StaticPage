import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.services';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ClaimsComponent } from '../claims/claims.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  public displayedColumns = ['ClaimId', 'ClaimName', 'SubmissionDate', 'Status', 'action'];

  dataSource: any;

  AdminDetails: any = [];
  source: any = [];

  //dependency injection
  constructor(private adminAPIservice: ApiService, private Dialogref: MatDialog) {
  }
  public isEditable = false;
  ngOnInit() {
    //call this method on component load
    this.readDetails();

  }
  /**
   * This method returns students details
   */

  readDetails() {
    this.adminAPIservice.getDetails().subscribe((data) => {

      this.AdminDetails = data;
      this.dataSource = new MatTableDataSource(this.AdminDetails);
      this.AdminDetails.forEach((claim: any) => {
        claim.claimsDetails.forEach( (i: any) => {
          this.source.push(i);
        })
      })
      console.log(this.source);
    })
  }

  openDialog() {
    this.Dialogref.open(PopUpComponent)
  }

}
