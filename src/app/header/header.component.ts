import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataStorageService } from '../shared/data-storage.service';
import { EditComponent } from '../list/edit/edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchQuery$ = new Subject<string>();
  searchFormControl = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private dataStorageService: DataStorageService,
    private dialog: MatDialog
  ) {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(() => this.searchFormControl.valid)
      )
      .subscribe((value) => {
        if (value) {
          this.searchQuery$.next(value);
        } else {
          this.searchQuery$.next('');
        }
      });
  }

  onSearch() {
    if (this.searchFormControl.valid && this.searchFormControl.value) {
      this.searchQuery$.next(this.searchFormControl.value);
      this.dataStorageService.searchCarsList(this.searchFormControl.value);
    } else {
      this.searchQuery$.next('');
      this.dataStorageService.searchCarsList('');
    }
  }

  clearSearch() {
    this.searchFormControl.setValue('');
    this.searchQuery$.next('');
    this.dataStorageService.searchCarsList('');
  }

  openAddItemWindow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      editMode: false,
      id: null,
      brand: '',
      model: '',
      color: '',
      year: '',
      vin: '',
      price: '0',
      availability: false,
    };

    const dialogRef = this.dialog.open(EditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.dataStorageService.addCar(result);
    });
  }
}
