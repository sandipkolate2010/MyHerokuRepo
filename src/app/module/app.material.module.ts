import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule, MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [CdkTableModule, MatTableModule, MatPaginatorModule],
  exports: [CdkTableModule, MatTableModule, MatPaginatorModule],
})
export class MaterialModule { }
