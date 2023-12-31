import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Car } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  carDescription: string = `${this.passedData.brand} ${this.passedData.model} ${this.passedData.color} ${this.passedData.year}`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: Car,
    public dataStorageService: DataStorageService
  ) {}

  deleteCar(car: Car): void {
    this.dataStorageService.deleteCar(car);
  }
}
