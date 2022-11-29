import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.services';
import { PopUpComponent } from '../pop-up/pop-up.component';

export interface UserData {
  ClaimNum: string;
  Patientname: string;
  EndDate: string;
  claimStatus: string;
}

@Component({
  selector: 'app-pop-up1',
  templateUrl: './pop-up1.component.html',
  styleUrls: ['./pop-up1.component.css']
})
export class PopUp1Component implements OnInit {

  displayedColumns: string[] = ['ClaimNum', 'name', 'Patientname', 'EndDate', 'claimStatus', 'Treatment', 'PolDur', 'PolAmt', 'Eligible', 'ClaimAmt', 'Coverage', 'Action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  source: any = [];
  claimData: any = [];

  constructor(private adminAPIservice: ApiService, private Dialogref: MatDialog, private route: Router) {
    this.adminAPIservice.getDetails().subscribe((data) => {
      this.source = data;
      // alert(JSON.stringify(this.source))
      this.source.forEach((claim: any) => {
        claim.claimsDetails.forEach((element: any) => {
          element.email = claim.email;
          this.claimData.push(element);
        });
      })
    })

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.claimData);

  }
  logout() {
    this.route.navigate(['home'])
  }
  ngOnInit(): void {
    throw ('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(claimId: any, email: any) {
    console.log(claimId);
    let claimInfo = {
      claimId: claimId,
      email: email
    }
    this.Dialogref.open(PopUpComponent, {
      data: claimInfo,
      disableClose: true
    })
  }
  cancelDialog() {
    this.Dialogref.closeAll();
  }
}
