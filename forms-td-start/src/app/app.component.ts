import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuiestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form.form.patchValue({
      username: suggestedName
    })
  }

  // onSumbit(form: NgForm) {
  //   console.log(form);
  // }

  onSumbit() {
    console.log(this.form);
    this.user.username = this.form.value.userdata.username;
    this.user.email = this.form.value.userdata.email;
    this.user.secretQuiestion = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;
    this.form.reset();
  }
}


