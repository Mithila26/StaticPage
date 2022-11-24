import { Injectable, NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
@Injectable({
  providedIn: 'root'
})
@NgModule({
  // since we're exporting these modules, add them to export
      exports: [
          MatTableModule,
          MatSortModule,
          MatProgressSpinnerModule,
          MatInputModule,
          MatPaginatorModule,
         
      ]
  })
export class AppMaterialModuleService {

  
}
