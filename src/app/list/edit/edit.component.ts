import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Car } from 'src/app/shared/interfaces';
import { FormValidatorsService } from 'src/app/shared/form-validators.service';
import { errorMessages } from 'src/app/shared/form-validators.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;
  originalCar: Car;
  matcher: FormValidatorsService;
  errorMessages = errorMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: Car & { editMode: boolean },
    private dialogRef: MatDialogRef<EditComponent>
  ) {
    this.editMode = passedData.editMode;
    this.matcher = new FormValidatorsService();

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
        [Validators.required, Validators.pattern(/^[0-9]{4}$/)]
      ),
      vin: new FormControl(
        { value: this.passedData.vin, disabled: this.editMode },
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{17}$/),
          Validators.maxLength(17),
          Validators.minLength(17),
        ]
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

    this.originalCar = {
      id: this.passedData.id,
      brand: this.passedData.brand,
      model: this.passedData.model,
      color: this.passedData.color,
      year: this.passedData.year,
      vin: this.passedData.vin,
      price: this.passedData.price,
      availability: this.passedData.availability,
    };
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

  compareCars(originalCar: Car, changedCar: Car): Car {
    const newCar: Car = { ...originalCar };
    Object.keys(newCar).forEach((key) => {
      if (changedCar[key]) {
        newCar[key] = changedCar[key];
      }
    });
    newCar.price = `$${parseFloat(newCar.price.toString()).toFixed(2)}`;
    newCar.availability = newCar.availability.toString() === 'true';
    return newCar;
  }

  saveChanges() {
    if (this.form.valid) {
      const editedCar: Car = this.compareCars(
        this.originalCar,
        this.form.value
      );
      this.dialogRef.close(editedCar);
    }
  }
}
