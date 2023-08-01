import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data.service';
import { DetailRekeningComponent } from './detail-rekening/detail-rekening.component';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TambahRekeningComponent } from './tambah-rekening/tambah-rekening.component';
import { listRekening } from 'src/app/model/list-rekening';

@Component({
  selector: 'app-rekening-tab',
  templateUrl: './rekening-tab.component.html',
  styleUrls: ['./rekening-tab.component.css'],
})
export class RekeningTabComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.getRekening();
    this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource(this.dataListRekening);
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'bank',
    'bankBranch',
    'accountNo',
    'accountName',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<listRekening>;
  dataListRekening: listRekening[] = [];
  searchText: any;
  dealerCode: any;
  statusText: any;
  // * (Isi Tabel) *
  bankCode: any;
  bankName: any;
  bankBiCode: any;
  bankCity: any;
  bankBranch: any;
  accountNo: any;
  accountName: any;
  accountStatus: any;
  tempStatus:any

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  getDataDealer() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
      console.log('dealerCode:', code);
    });
  }

  getRekening() {
    this.getDataDealer();
    let parameter = {
      dealer_code: this.dealerCode,
    };
    this.dataListRekening = [];
    this.dataSource = new MatTableDataSource(this.dataListRekening);
    this.services.postDealer('getDealRek', parameter).subscribe(
      (res) => {
        console.log(res.body);
        res.body.forEach((element: any) => {
          if(element.acc_no_status =='A'){
            this.tempStatus ='APPROVE'
          }else if(element.acc_no_status =='B'){
            this.tempStatus='BELUM APPROVE'
          }else if(element.acc_no_status =='R'){
            this.tempStatus='REJECT'
          }else{
            this.tempStatus='REVISI'
          }
          this.dataListRekening.push({
            bankCode: element.bank_code,
            bankName: element.bank_name,
            bankBiCode: element.bank_bi_code,
            bankCity: element.bank_city,
            bankBranch: element.bank_branch,
            accountNo: element.acc_no,
            accountName: element.acc_name,
            
            accountStatus: this.tempStatus,
            rekeningCode: element.mst_deal_rek_id,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataListRekening);
        this.ngAfterViewInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showFormTambah() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '65%';
    this.dialog
      .open(TambahRekeningComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  showFormDetail(element: any) {
    // console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '65%';
    dialogConfig.data = { element: element };
    this.dialog
      .open(DetailRekeningComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }
}

// ! ------------------------  DUMMY --------------------------------------------
