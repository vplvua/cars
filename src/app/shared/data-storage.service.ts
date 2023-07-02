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

  updateCar(editedCar: Car) {
    const carsList = this.carsList$.getValue();
    const index = carsList.findIndex((car) => car.id === editedCar.id);

    if (index !== -1) {
      carsList[index] = editedCar;
      this.carsList$.next(carsList);
      this.localStorageService.storeData(carsList);
    } else {
      console.error('Car not found');
    }
  }

  setNewCarId(): number {
    const carsList = this.carsList$.getValue();
    const maxId = Math.max(...carsList.map((car) => car.id));
    return maxId + 1;
  }

  addCar(newCar: Car): void {
    const carsList = this.carsList$.getValue();
    console.log('newCar', newCar);
    newCar.id = this.setNewCarId();
    carsList.push(newCar);
    console.log('carsList', carsList);
    this.carsList$.next(carsList);
    this.localStorageService.storeData(carsList);
  }

  deleteCar(car: Car): void {
    const carsList = this.carsList$.getValue();
    const index = carsList.findIndex((carItem) => carItem.id === car.id);

    if (index !== -1) {
      carsList.splice(index, 1);
      this.carsList$.next(carsList);
      this.localStorageService.storeData(carsList);
    } else {
      console.error('Car not found');
    }
  }
}
