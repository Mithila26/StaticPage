import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  premiumData!: FormGroup;
  amtObject: any;

  constructor(private router: Router, private _formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.premiumData = this._formBuilder.group({
      premiumAmt: ['', [Validators.required]],
      topUp: ['', [Validators.required]]
    })
  }

  Submit(){
    this.amtObject = {
      totalCoverage: (this.premiumData.value.premiumAmt + this.premiumData.value.topUp) * 1000,
      totalPremium: this.premiumData.value.premiumAmt + this.premiumData.value.topUp,
      totalBalance: (this.premiumData.value.premiumAmt + this.premiumData.value.topUp) * 1000
    }

    this.customerService.addPremium(this.amtObject).subscribe(response => {

      if (response.success == true) {
        Swal.fire(
          response.message,
          'Claims is enabled now!',
          'success'
        )
        window.location.reload();
        this.router.navigate(['userView']);
      }
    }, err => {
      if (err.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Session Expired',
          text: 'Please LogIn Again'
        })
        this.router.navigate(['logout']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    })
  }

}
