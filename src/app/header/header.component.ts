import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchQuery$ = new Subject<string>();
  searchFormControl = new FormControl('', [Validators.minLength(3)]);

  constructor(private dataStorageService: DataStorageService) {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(() => this.searchFormControl.valid)
      )
      .subscribe((value) => {
        if (value) {
          this.dataStorageService.searchCarsList(value);
        } else {
          this.dataStorageService.searchCarsList('');
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
}
