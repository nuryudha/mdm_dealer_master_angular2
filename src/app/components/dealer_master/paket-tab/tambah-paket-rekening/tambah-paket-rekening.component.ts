import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { listApplTag, listBankPaketRekening } from 'src/app/model/list-paket';

import { DataService } from 'src/app/services/data.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tambah-paket-rekening',
  templateUrl: './tambah-paket-rekening.component.html',
  styleUrls: ['./tambah-paket-rekening.component.css'],
})
export class TambahPaketRekeningComponent implements OnInit {
  constructor(
    private services: MainService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.getListApplTag();
    this.getListBank();
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'tipeRekening',
    'bank',
    'accountNo',
    'accountName',
  ];

  dataSource = new MatTableDataSource<TipeRekening>(ELEMENT_DATA);
  @Output() backButtonClicked = new EventEmitter<void>();
  kodePaket: any = 'XXXXXXXXXX';
  namaPaket: any = 'XXXXXXXXXX';
  listApplTagid: any;
  listApplTagDesc: any;
  dataListApplTag: listApplTag[] = [];
  dealerCode: any;
  dataListBank: listBankPaketRekening[] = [];
  selectDealerRek: any;
  accountName: any;
  accountNo: any;

  // ?
  selectedBankList: any[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  getListApplTag() {
    this.services.getDealer('listApplicationTag').subscribe(
      (res) => {
        // console.log(res);
        let arrayListApplTag: listApplTag[] = [];
        res.body.forEach((element: any) => {
          arrayListApplTag.push({
            applTagId: element.appl_tag_id,
            applTagDesc: element.appl_tag_id + ' - ' + element.appl_tag_desc,
          });
          this.dataListApplTag = arrayListApplTag;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDealerCode() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
      console.log('dealerCode:', code);
    });
  }

  getListBank() {
    this.getDealerCode();
    let parameter = {
      dealer_code: this.dealerCode,
    };
    this.services.postDealer('selectDealerRekening', parameter).subscribe(
      (res) => {
        // console.log(res);
        let arrayListBank: listBankPaketRekening[] = [];
        res.body.forEach((element: any) => {
          arrayListBank.push({
            bankCode: element.bank_code,
            bankName: element.bank_name,
            acc_no: element.acc_no,
            acc_name: element.acc_name,
            discSelectBank:
              element.bank_code +
              ' - ' +
              element.bank_name +
              ' - ' +
              element.acc_no +
              ' A.N. ' +
              element.acc_name,
          });
          this.dataListBank = arrayListBank;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  backPaketRekening() {
    this.backButtonClicked.emit();
  }

  saveRekening() {
    console.log(this.listApplTagDesc);
    console.log(this.selectedBankList[0]);
    console.log(this.selectedBankList[1]);
    console.log(this.selectedBankList[2]);
  }

  resetRekening() {
    this.selectedBankList = [];
    this.listApplTagDesc = undefined;
  }
}

// ! ------------------------  DUMMY --------------------------------------------
export interface TipeRekening {
  tipeRekening: string;
}

const ELEMENT_DATA: TipeRekening[] = [
  { tipeRekening: 'Produk' },
  { tipeRekening: 'Komisi' },
  { tipeRekening: 'Diskon' },
];
