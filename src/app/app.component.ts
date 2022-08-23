import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'masoud';
  loginForm!: FormGroup;
  loading = false;
  form: any;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    if (localStorage.getItem('login')) {
      // @ts-ignore
      this.form = JSON.parse(localStorage.getItem('login'));
      console.log(this.form);
    }
  }

  login() {
    this.loading = true;
    let body = {
      firstName: this.loginForm.controls['firstName'].value,
      lastName: this.loginForm.controls['lastName'].value,
      email: this.loginForm.controls['email'].value
    }
    localStorage.setItem('login', JSON.stringify(body));
    window.location.reload();
    this.loading = false;
  }

  logOut() {
    this.loading = true;
    localStorage.removeItem('login');
    this.loading = false;
    window.location.reload();
  }
}
