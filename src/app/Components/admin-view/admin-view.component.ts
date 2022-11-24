import { Component, OnInit } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.services';
import { admins } from 'src/app/Services/Admins';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent  {

  admins :any = [];
  // columns we will show on the table
  public displayedColumns = ['ClaimId', 'ClaimName', 'SubmissionDate', 'Status','action' ];
  //the source where we will get the data
 dataSource = new MatTableDataSource<admins>();
  router: any;

  AdminDetails:any = [];

  //dependency injection
  constructor( private adminAPIservice: ApiService , private Dialogref : MatDialog) {
  }
  public isEditable = false;
  ngOnInit(){
    //call this method on component load
    this.readDetails();

  }
  /**
   * This method returns students details
   */

  readDetails(){
    this.adminAPIservice.getDetails().subscribe((data) => {
     this.AdminDetails = data;
     this.dataSource = new MatTableDataSource<admins>(this.AdminDetails);
    })    
  }

  
 
 
  openDialog(){
   this.Dialogref.open(PopUpComponent)
  }

  
 


 

 


 
}
