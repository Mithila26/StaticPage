import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { admins } from 'src/app/Services/Admins';
import { ApiService } from 'src/app/Services/api.services';
import { PopUpComponent } from '../pop-up/pop-up.component';
export interface UserData {
  ClaimNum: string;
  Patientname: string;
  EndDate: string;
  claimStatus: string;
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})


export class UserViewComponent implements OnInit {


  admins: any = [];
  // columns we will show on the table
  public displayedColumns = ['ClaimNum', 'Patientname', 'claimStatus'];
  //the source where we will get the data
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  source: any = [];
  claimData: any = [];
  userEmail: any;
  local!: any;
  //dependency injection
  constructor(private adminAPIservice: ApiService, private Dialogref: MatDialog,private route:Router) {
  }
  public isEditable = false;
  ngOnInit() {

    this.readEmployee();


  }
  /**
   * This method returns students details
   */
   logout(){
    this.route.navigate(['home'])
   }
   submitClaim(){
    this.route.navigate(['claims'])
   }

  readEmployee() {
    this.local = localStorage.getItem('currentUser')
    // console.log(JSON.stringify(this.local))
    // alert(JSON.stringify(local));
    this.adminAPIservice.getUserDetails().subscribe((data: any) => {
      
      this.source = data;
      this.source.forEach((claim: any) => {
        console.log(JSON.stringify(claim))
        claim.claimsDetails.forEach((element: any) => {
          this.claimData.push(element);
        });
      })
      console.log(JSON.stringify(this.claimData))
      this.dataSource = new MatTableDataSource(this.claimData);
    })
    // Assign the data to the data source for the table to render
    

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog() {
    this.Dialogref.open(PopUpComponent);
  }













}
