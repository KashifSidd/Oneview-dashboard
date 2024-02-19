import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Services } from 'src/app/shared/models';
import { ICouponDetails, IRefundDetails } from '../model/home';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  couponDetails: ICouponDetails;
  refundDetails: IRefundDetails
  darkMode: boolean;
  service: string;
  readonly Services = Services;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.openedFor === 'coupon details') {
      this.couponDetails = this.data.details;
    } else if (this.data.openedFor === 'refund details'){
      this.refundDetails = this.data.details;
    }
    this.darkMode = this.data.mode;
    this.service = this.data.service;
  }

}
