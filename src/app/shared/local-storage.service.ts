import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Car } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  carsList$: Subject<Car[]> = new Subject<Car[]>();

  constructor() {}
}
