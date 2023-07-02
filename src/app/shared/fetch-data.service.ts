import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Car } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  carsList$: Subject<Car[]> = new Subject<Car[]>();
  isFetching$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getCarsList(): void {
    this.isFetching$.next(true);
    this.http
      .get<any>('')
      .pipe(
        map((response) => {
          const responseData = response.cars;
          return responseData.map(
            (carData: {
              id: number;
              car: string;
              car_model: string;
              car_color: string;
              car_model_year: string;
              car_vin: string;
              price: string;
              availability: boolean;
            }) => {
              return {
                id: carData.id,
                brand: carData.car,
                model: carData.car_model,
                color: carData.car_color,
                year: carData.car_model_year,
                vin: carData.car_vin,
                price: carData.price,
                availability: carData.availability,
              };
            }
          );
        })
      )
      .subscribe((carsList) => {
        this.carsList$.next(carsList);
        this.isFetching$.next(false);
      });
  }
}
