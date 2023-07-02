import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorsService implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

export const errorMessages: { [key: string]: string } = {
  required: 'This field is required',
  year: 'Enter four digit year',
  vin_pattern: 'VIN must contain only capital letters and numbers',
  vin_length: 'VIN must be 17 characters long',
};
