import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Car } from './interfaces';
import { LocalStorageService } from './local-storage.service';
import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  carsList$: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  searchQuery$: Subject<string> = new Subject<string>();
  isFetching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private localStorageService: LocalStorageService,
    private fetchDataService: FetchDataService
  ) {}

  searchCarsList(searchTerm: string): void {
    this.searchQuery$.next(searchTerm);
  }

  get carsList(): Subject<Car[]> {
    return this.carsList$;
  }

  getCarsList(): void {
    const storedData = this.localStorageService.fetchData();
    if (storedData.length > 0) {
      this.carsList$.next(storedData);
      this.isFetching$.next(false);
    } else {
      this.fetchDataService.getCarsList().subscribe((carsList) => {
        this.carsList$.next(carsList);
        this.isFetching$.next(false);
        this.localStorageService.storeData(carsList);
      });
    }
  }

  updateCarsList(carsList: Car[]): void {
    this.carsList$.next(carsList);
    this.localStorageService.storeData(carsList);
  }
}
