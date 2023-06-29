import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [MatInputModule, MatSortModule, MatTableModule],
  exports: [MatInputModule, MatSortModule, MatTableModule],
})
export class MaterialModule {}
