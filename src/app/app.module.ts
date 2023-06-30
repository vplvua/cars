import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DataStorageService } from './shared/data-storage.service';
import { MaterialModule } from './material.module';
import { FetchDataInterceptor } from './shared/fetch-data.interceptor';
import { DropdownComponent } from './list/dropdown/dropdown.component';
import { DeleteModalComponent } from './list/delete-modal/delete-modal.component';

@NgModule({
  declarations: [AppComponent, ListComponent, DropdownComponent, DeleteModalComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    DataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: FetchDataInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
