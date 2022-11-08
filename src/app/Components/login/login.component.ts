import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = { email : '', password:''};
  message: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  loginCheck() {
    console.log(this.login);
  }

}
