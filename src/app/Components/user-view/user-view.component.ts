import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/Services/api.services';
import Swal from 'sweetalert2';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { PremiumComponent } from '../premium/premium.component';

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

  public displayedColumns = ['ClaimNum', 'Patientname', 'claimStatus', 'moreInfo'];

  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  source: any = [];
  claimData: any = [];
  user!: any;
  router: any;
  premium: any;
  balance: any;
  coverage: any;

  constructor(private adminAPIservice: ApiService, private Dialogref: MatDialog, private route: Router, private local: LocationStrategy) {
  }

  ngOnInit() {
    history.pushState(null, 'null', location.href);
    this.local.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
    
    this.readEmployee();
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

  addPremium() {
    this.Dialogref.open(PremiumComponent, { width: '250px', closeOnNavigation: true });
  }

  submitClaim() {
    if (this.premium === 0 || this.premium === null) {
      Swal.fire({
        text: 'Please add Premium',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['userView']);
        }
      })
    } else {
      this.route.navigate(['claims']);
    }
  }

  readEmployee() {
    Swal.fire({
      title: 'Please wait...', allowOutsideClick: false,
      allowEscapeKey: false
    });
    Swal.showLoading(null);

    this.adminAPIservice.getUserDetails().subscribe((data: any) => {
      Swal.close();

      this.source = data;
      this.source.forEach((claim: any) => {
        localStorage.setItem('user', claim.userName);
        this.premium = claim.totalPremium;
        this.balance = claim.totalBalance;
        this.coverage = claim.totalCoverage;
        claim.claimsDetails.forEach((element: any) => {
          this.claimData.push(element);
        });
      })
      this.user = localStorage.getItem('user');
      this.dataSource = new MatTableDataSource(this.claimData);
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

  infoDialog(treatment: any, claimAmt: any) {
    let claimInfo = {
      treatment: treatment,
      claimAmt: claimAmt,
      premium : this.premium,
      balance: this.balance,
      coverage: this.coverage
    }
    this.Dialogref.open(MoreInfoComponent, {
      data: claimInfo
    })
  }

}
