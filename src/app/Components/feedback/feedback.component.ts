import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

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
    feedback: new FormControl(),
  });
  constructor() {}
  get firstname() {
    return this.feedbackform.get('firstName');
  }
  ngOnInit(): void {}
  onSubmit(data: any) {
    //alert(JSON.stringify(this.feedbackform.value));
    //if(this.feedbackform.valid){
    alert('Thank You for your Feedback');
    console.log('Form Submitted!');
    this.feedbackform.reset(); //}
  }
  clearForm() {
    this.feedbackform.reset(); // Resets the formgroup
    //this.answer = null;
  }
}
