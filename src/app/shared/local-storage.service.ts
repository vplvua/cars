import { Injectable } from '@angular/core';

import { Car } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private STORAGE_KEY = 'cars';

  storeData(cars: Car[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cars));
  }

  fetchData(): Car[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
