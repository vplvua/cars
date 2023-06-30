import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Car } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: Car & { editMode: boolean }
  ) {
    console.log(passedData);
    this.editMode = passedData.editMode;

    this.form = new FormGroup({
      brand: new FormControl(
        { value: this.passedData.brand, disabled: this.editMode },
        Validators.required
      ),
      model: new FormControl(
        { value: this.passedData.model, disabled: this.editMode },
        Validators.required
      ),
      color: new FormControl(this.passedData.color, Validators.required),
      year: new FormControl(
        { value: this.passedData.year, disabled: this.editMode },
        Validators.required
      ),
      vin: new FormControl(
        { value: this.passedData.vin, disabled: this.editMode },
        [Validators.required, Validators.pattern(/^[A-Z0-9]{17}$/)]
      ),
      price: new FormControl(
        parseFloat(this.passedData.price.replace('$', '')),
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      ),
      availability: new FormControl(
        this.passedData.availability.toString(),
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      availability: this.passedData.availability.toString(),
    });
  }

  onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.]/g, '');
  }
}
