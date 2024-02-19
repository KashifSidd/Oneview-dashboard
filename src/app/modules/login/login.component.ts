import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { HomeService } from 'src/app/shared/services/home.service';
import { Config } from 'ng-otp-input/lib/models/config';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Roles, Services } from 'src/app/shared/models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  orderId: string;
  service: string;
  fieldTextType: boolean;
  isOtpSent:boolean;
  phone = new FormControl('',[Validators.required, Validators.pattern("[6-9][0-9]{9}")]);
  phoneOtp: string;
  canSendOtp: boolean=true;
  sendOtpText  = '';
  verifyOtpText = 'Verify Otp';
  timeLeft: number = 30;
  interval: any;
  isPasswordUpdate: boolean;
  otpInputConfig: Config = {
    allowNumbersOnly: true,
    length: 5,
  };
  canResendOtp: boolean;
  @ViewChild(NgOtpInputComponent) otpInputField:NgOtpInputComponent;

  constructor(private router: Router, private loginService: LoginService, private toastMsgService:ToastService, private location: Location, private homeService: HomeService) {}

  roles = {
    superadmin: 'Super Admin',
    admin: 'Admin'
  }
  error:HttpErrorResponse;

  ngOnInit() {
    // for deep linking
    const state: any = this.location.getState();
    if (state.orderId) {
      this.orderId = state.orderId;
    }
    if (state.service) {
      this.service = state.service;
    }
   }

   /**
   * Method that starts timer for resend otp
   */
   startTimer() {
    this.canResendOtp = false;
    this.interval = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) {
        this.stopTimer();
      }
    }, 1000)
  }

  /**
   * Method that stops timer
   */
  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 30;
    this.canResendOtp = true;
  }

 /**
   * Method that sends login otp
   * @returns 
   */
 sendOtp() {
  if (!this.phone.valid) return this.toastMsgService.showError('Enter valid phone number');
  const data = {
    phone: `+91${this.phone.value}`
  }
  this.loginService.sendLoginOtp(data).subscribe(res => {
    this.startTimer();
    this.isOtpSent = true;
    this.toastMsgService.showSuccess('OTP sent');
  })
  if(this.otpInputField)
  this.otpInputField.setValue(null);
  }

  /**
   * Method that verify login otp
   * @returns 
   */
  verifyOtp(){
    const data = {
      phone: `+91${this.phone.value}`,
      otp: this.phoneOtp
    }
    this.loginService.verifyLoginOtp(data).subscribe(response => {
      this.stopTimer();
        localStorage.setItem('token',response['result']['token']);
        localStorage.setItem('refreshToken',response['result']['refresh_token']);
        localStorage.setItem('userName', response['result']['full_name']);
        const role = [];
        response['result']['role'].forEach(r => role.push(Roles[r]));
        localStorage.setItem('role', JSON.stringify(role));
        if(!response['result']['force_reset_password']){
          this.isPasswordUpdate = true;
        }
        localStorage.setItem('service', Services.Food);
        this.homeService.service$.next(localStorage.getItem('service'));
        this.router.navigate(['home'], {queryParams: {service: this.service, orderId: this.orderId}});   
        this.toastMsgService.showSuccess('Logged In Successfully');   
    })

  } 

  /**
   * Method that invokes on each otp input
   * and it stores the otp
   * @param event 
   */
  onOtpChange(event: string) {
    this.phoneOtp = event;
  }

  /**
   * Method that allow user to enter phone number again
   */
  signInAgain() {
    this.phone.reset();
    this.isOtpSent = false;
    this.stopTimer();
    if(this.otpInputField)
    this.otpInputField.setValue(null);
  }
}
