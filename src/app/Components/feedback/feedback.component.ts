import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackform = new FormGroup({
    firstName: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    myVar: new FormControl('', Validators.required),
    myVari: new FormControl('', Validators.required),
    myVaria: new FormControl('', Validators.required),
    feedback: new FormControl(),
  });

  constructor() { }

  get firstname() {
    return this.feedbackform.get('firstName');
  }

  ngOnInit(): void { }

  onSubmit() {
    Swal.fire({
      icon: 'success',
      title: 'Thank You for your Feedback',
      showConfirmButton: false,
      timer: 2000
    })
    this.feedbackform.reset();
  }

  clearForm() {
    this.feedbackform.reset();
  }

}
