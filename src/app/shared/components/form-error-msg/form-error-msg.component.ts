import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-error-msg',
  template: `
    <ul *ngIf="shouldShowErrors()" style="padding-left:0;margin-bottom:0">
      <li style="color: red;list-style-type:none;" *ngFor="let error of listOfErrors(); let i = index">
      <span *ngIf="i < 1">{{ error }} </span>
      </li>
    </ul>
  `,
})
export class FormErrorMsgComponent {
  @Input('controls') controls: FormControl;
  @Input() private control: AbstractControlDirective | AbstractControl;

  /**
   * Method that shows validation messages
   */
  private static readonly errorMessages = {
    required: () => '* This field is required',
    pattern: (params) => '* Entered value is Invalid. ',
    maxlength: (params) =>
      '* Enter maximun ' + params.requiredLength + ' characters.',
    minlength: (params) =>
      '* Enter minimum ' + params.requiredLength + ' characters.',
    openingTimeMore: () =>
      '* Opening hours can not be greater than closing hours.',
    email: () => '* Please enter valid email address',
  };

  /**
   * Method that should show errors
   * @returns boolean
   */
  shouldShowErrors(): boolean {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  /**
   * Method that holds list of errors
   * @returns string[]
   */
  listOfErrors(): string[] {
    return Object.keys(this.control.errors).map((field) =>
      this.getMessage(field, this.control.errors[field])
    );
  }

  /**
   * Method that gets the error messages
   * @param type
   * @param params
   * @returns FormErrorMsgComponent.errorMessages[type](params)
   */
  private getMessage(type: string, params: any) {
    return FormErrorMsgComponent.errorMessages[type](params);
  }
}
