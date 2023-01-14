import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  treatment!: string;
  claimAmt!: string;
  coverage!: string;
  balance!: string;
  premium!: string;

  constructor(@Inject(MAT_DIALOG_DATA) private moreData: any) { }

  ngOnInit(): void {
    this.treatment = this.moreData.treatment;
    this.claimAmt = this.moreData.claimAmt;
    this.coverage = this.moreData.coverage;
    this.balance = this.moreData.balance;
    this.premium = this.moreData.premium;
  }

}
