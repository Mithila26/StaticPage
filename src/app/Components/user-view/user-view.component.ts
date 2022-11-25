import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { admins } from 'src/app/Services/Admins';
import { ApiService } from 'src/app/Services/api.services';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent  {

  
  admins :any = [];
  // columns we will show on the table
  public displayedColumns = ['ClaimId', 'ClaimName', 'SubmissionDate','action' ];
  //the source where we will get the data
 dataSource = new MatTableDataSource<admins>();
  router: any;

  Employee:any = [];

  //dependency injection
  constructor( private adminAPIservice: ApiService , private Dialogref : MatDialog) {
  }
  public isEditable = false;
  ngOnInit(){
    //call this method on component load
    this.readEmployee();

  }
  /**
   * This method returns students details
   */

  readEmployee(){
    this.adminAPIservice.getDetails().subscribe((data: any) => {
     this.Employee = data;
     this.dataSource = new MatTableDataSource<admins>(this.Employee);
    })    
  }

  
 
 
  openDialog(){
   this.Dialogref.open(PopUpComponent);
  }

  
 


 

 


 

 
}
