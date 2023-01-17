import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.services';
import Swal from 'sweetalert2';
import { PopUpComponent } from '../pop-up/pop-up.component';

export interface UserData {
  ClaimNum: string;
  Patientname: string;
  EndDate: string;
  claimStatus: string;
  totalBalance:string;
  
}

@Component({
  selector: 'app-pop-up1',
  templateUrl: './pop-up1.component.html',
  styleUrls: ['./pop-up1.component.css']
})
export class PopUp1Component implements OnInit {

  displayedColumns: string[] = ['ClaimNum', 'name', 'Patientname', 'EndDate', 'claimStatus', 'Treatment', 'PolDur', 'PolAmt', 'Eligible', 'ClaimAmt', 'Coverage','CurrentBalance','Action' ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  source: any = [];
  claimData: any = [];
  
  

  constructor(private adminAPIservice: ApiService, private Dialogref: MatDialog, private route: Router, private local: LocationStrategy) {
  }

  logout() {
    Swal.fire({
      text: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign Out'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['logout']);
      }
    })
  }

  ngOnInit(): void {
    history.pushState(null, 'null', location.href);
    this.local.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });

    Swal.fire({
      title: 'Please wait...', allowOutsideClick: false,
      allowEscapeKey: false
    });
    Swal.showLoading(null);

    this.adminAPIservice.getDetails().subscribe((data) => {
      
      Swal.close();
      this.source = data;
      this.source.forEach((claim: any) => {
        
        claim.claimsDetails.forEach((element: any) => {
          console.log(claim)
          element.email = claim.email;
          element.Balance = claim.totalBalance;
          this.claimData.push(element); 
                   
        }); 
      })
      
    
      this.dataSource = new MatTableDataSource(this.claimData);
      // console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(claimId: any, email: any, ClaimAmt: any, totalBalance: any) {
    let claimInfo = {
      claimId: claimId,
      email: email,
      ClaimAmt:ClaimAmt,
      CurrentBalance:totalBalance
    }
    this.Dialogref.open(PopUpComponent, {
      data: claimInfo
    })
  }

  cancelDialog() {
    this.Dialogref.closeAll();
  }

}
