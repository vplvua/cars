import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription, map, startWith, switchMap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Car } from '../shared/interfaces';
import { DataStorageService } from '../shared/data-storage.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'brand',
    'model',
    'vin',
    'color',
    'year',
    'price',
    'availability',
    'actions',
  ];
  dataSource = new MatTableDataSource<Car>();
  isLoading = false;

  subscription: Subscription = new Subscription();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataStorageService: DataStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataStorageService.getCarsList();
    this.subscription.add(
      this.dataStorageService.carsList
        .pipe(
          switchMap((carsList) =>
            this.dataStorageService.searchQuery$.pipe(
              map((searchQuery) => {
                if (searchQuery.trim().length === 0) {
                  return carsList;
                } else {
                  return carsList.filter((car) =>
                    this.searchCar(car, searchQuery.toLowerCase())
                  );
                }
              }),
              startWith(carsList)
            )
          )
        )
        .subscribe((carsList) => {
          this.dataSource.data = carsList;
          this.isLoading = true;
        })
    );
  }

  editCar(car: Car) {
    console.log('Edit car: ', car);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ...car };

    const dialogRef = this.dialog.open(EditComponent, dialogConfig);
  }

  deleteCar(car: Car) {
    console.log('Delete car: ', car);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ...car };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);
  }

  private searchCar(car: Car, searchTerm: string): boolean {
    return (
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.color.toLowerCase().includes(searchTerm) ||
      car.year.toString().includes(searchTerm) ||
      car.vin.toLowerCase().includes(searchTerm) ||
      car.price.toLowerCase().includes(searchTerm) ||
      car.availability.toString().toLowerCase().includes(searchTerm)
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
