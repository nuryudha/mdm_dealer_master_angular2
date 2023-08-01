import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AlfabetOnlyDirective } from './directives/alfabet-only.directive';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BranchTabComponent } from './components/dealer_master/branch-tab/branch-tab.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DateFormatDirective } from './directives/date-format.directive';
import { DatePipe } from '@angular/common';
import { DealerTabComponent } from './components/dealer_master/dealer-tab/dealer-tab.component';
import { DetailEmployeeComponent } from './components/dealer_master/employee-tab/detail-employee/detail-employee.component';
import { DetailRekeningComponent } from './components/dealer_master/rekening-tab/detail-rekening/detail-rekening.component';
import { EmployeeTabComponent } from './components/dealer_master/employee-tab/employee-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { ListAlamatComponent } from './components/dealer_master/dealer-tab/list-alamat/list-alamat.component';
import { ListDealerComponent } from './components/dealer_master/dealer-tab/list-dealer/list-dealer.component';
import { MainDealerComponent } from './components/dealer_master/main-dealer.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './module/material.module';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PaketTabComponent } from './components/dealer_master/paket-tab/paket-tab.component';
import { RekeningTabComponent } from './components/dealer_master/rekening-tab/rekening-tab.component';
import { SearchDealerBranchComponent } from './components/dealer_master/branch-tab/search-dealer-branch/search-dealer-branch.component';
import { SearchEmployeeComponent } from './components/dealer_master/employee-tab/search-employee/search-employee.component';
import { TambahDealerBranchComponent } from './components/dealer_master/branch-tab/tambah-dealer-branch/tambah-dealer-branch.component';
import { TambahEmployeeComponent } from './components/dealer_master/employee-tab/tambah-employee/tambah-employee.component';
import { TambahPaketRekeningComponent } from './components/dealer_master/paket-tab/tambah-paket-rekening/tambah-paket-rekening.component';
import { TambahRekeningComponent } from './components/dealer_master/rekening-tab/tambah-rekening/tambah-rekening.component';
import { DetailPaketRekeningComponent } from './components/dealer_master/paket-tab/detail-paket-rekening/detail-paket-rekening.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTabComponent,
    MainDealerComponent,
    DealerTabComponent,
    TambahEmployeeComponent,
    BranchTabComponent,
    TambahDealerBranchComponent,
    SearchDealerBranchComponent,
    RekeningTabComponent,
    TambahRekeningComponent,
    PaketTabComponent,
    TambahPaketRekeningComponent,
    SearchEmployeeComponent,
    ListDealerComponent,
    ListAlamatComponent,
    DetailEmployeeComponent,
    DateFormatDirective,
    AlfabetOnlyDirective,
    NumberOnlyDirective,
    DetailRekeningComponent,
    DetailPaketRekeningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectFilterModule,
    MatSelectModule,
  ],

  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
