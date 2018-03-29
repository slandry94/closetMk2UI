import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {LoginModule} from './login.module';
import * as shajs from 'sha.js';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  public displayError: boolean;
  public errorMsg: string;
  private _loginService: LoginService;
  constructor(loginService: LoginService, private router: Router) {
    this._loginService = loginService;
  }

  ngOnInit() {
  }
  login() {
    // console.log(shajs('sha256').update(this.password).digest('hex'));
    this.updateLoginTimestamp();
  }
  updateLoginTimestamp() {
    this._loginService.attemptLogin(this.username, shajs('sha256').update(this.password).digest('hex')).subscribe(
      data => {this.onLoginSuccess(data); },
      error => {this.onLoginError(error); },
      () => console.log('completed')
    );
  }
  private onLoginSuccess(response) {
    this.displayError = false;
    this.errorMsg = '';
    console.log(response);
    // route to user or admin landing
    if (response === 'userLanding') {
      // route to user
      console.log('User Landing');
      this.router.navigate(['/userLanding']);
    } else if (response === 'adminLanding') {
      // route to admin
      console.log('Admin Landing');
      this.router.navigate(['/adminLanding']);
    } else {
      console.log(response);
    }
  }
  private updateAdminLoginTimestamp() {

  }
  private onLoginError(response) {
    console.log('error');
    this.displayError = true;
    this.errorMsg = 'Unable to login.  Please ensure that your credentials are correct';
    console.log(response);
  }
}
