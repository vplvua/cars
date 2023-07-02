import { Injectable } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Car } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  carsList$: Subject<Car[]> = new Subject<Car[]>();
  searchQuery$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  searchCarsList(searchTerm: string): void {
    this.searchQuery$.next(searchTerm);
    this.carsList$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((cars) => {
          return cars.filter((car) => {
            return (
              car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.year
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              car.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.availability
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          });
        })
      )
      .subscribe((filteredCars) => {
        this.carsList$.next(filteredCars);
      });
  }

  get carsList(): Subject<Car[]> {
    return this.carsList$;
  }

  set carsList(carsList: Subject<Car[]>) {
    this.carsList$ = carsList;
  }
}
