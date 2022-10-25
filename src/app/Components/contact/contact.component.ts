import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+[a-zA-Z]+')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl()
  })

  arr:any =[];
  
  constructor() { }

  ngOnInit(): void {
  }

  Submit(data: any) {
    alert("We will contact you soon ");
    this.arr.push(JSON.stringify(this.contactform.value));
    console.log(this.arr);
    this.contactform.reset();
  }
}
