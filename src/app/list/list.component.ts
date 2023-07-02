import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription, map, startWith, switchMap, tap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Car } from '../shared/interfaces';
import { DataStorageService } from '../shared/data-storage.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditComponent } from './edit/edit.component';
import { FetchDataService } from '../shared/fetch-data.service';

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
  isLoading = true;
  subscription: Subscription = new Subscription();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataStorageService: DataStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.dataStorageService.isFetching$.subscribe((isLoading) => {
        this.isLoading = isLoading;
      })
    );

    this.dataStorageService.getCarsList();

    this.subscription.add(
      this.dataStorageService.carsList$.subscribe((carsList) => {
        this.dataSource.data = carsList;
      })
    );

    this.subscription.add(
      this.dataStorageService.searchQuery$.subscribe((searchQuery) => {
        this.dataSource.filter = searchQuery.trim().toLowerCase();
      })
    );
  }

  editCar(car: Car) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { editMode: true, ...car };

    const dialogRef = this.dialog.open(EditComponent, dialogConfig);
  }

  deleteCar(car: Car) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ...car };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (car, property) => {
      switch (property) {
        case 'brand':
          return car.brand.toLowerCase();
        case 'model':
          return car.model.toLowerCase();
        case 'vin':
          return car.vin.toLowerCase();
        case 'color':
          return car.color.toLowerCase();
        case 'year':
          return car.year.toString();
        case 'price':
          return car.price.toLowerCase();
        case 'availability':
          return car.availability.toString().toLowerCase();
        default:
          return '';
      }
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
