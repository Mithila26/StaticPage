import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor() { }

  ngOnInit(): void { }

  Submit() {
    Swal.fire({
      icon: 'success',
      title: 'We will contact you soon...',
      text: 'Thank you!',
      showConfirmButton: false,
      timer: 2000
    })
    this.contactform.reset();
  }
}
