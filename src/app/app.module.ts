import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DataStorageService } from './shared/data-storage.service';
import { MaterialModule } from './material.module';
import { FetchDataInterceptor } from './shared/fetch-data.interceptor';
import { DropdownComponent } from './list/dropdown/dropdown.component';
import { DeleteModalComponent } from './list/delete-modal/delete-modal.component';
import { EditComponent } from './list/edit/edit.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DropdownComponent,
    DeleteModalComponent,
    EditComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: FetchDataInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
