import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  allListDetail,
  infoPaketRek,
  listApplTag,
  listBankPaketRekening,
  listBankPaketRekening2,
} from 'src/app/model/list-paket';

import { DataService } from 'src/app/services/data.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-paket-rekening',
  templateUrl: './detail-paket-rekening.component.html',
  styleUrls: ['./detail-paket-rekening.component.css'],
})
export class DetailPaketRekeningComponent implements OnInit {
  constructor(private services: MainService, private dataService: DataService) {
    this.dataSourceInfoRek = new MatTableDataSource(this.dataDetailInfoRek);
  }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.getListApplTag();
    this.getListBank();
    this.getSelectPktRekDtl();
    this.getInfoDetailrek();
    // console.log(this.row);
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'tipeRekening',
    'bank',
    'accountNo',
    'accountName',
  ];

  @Output() backButtonClicked = new EventEmitter<void>();
  dataSource = new MatTableDataSource<TipeRekening>(ELEMENT_DATA);
  dataSourceInfoRek!: MatTableDataSource<infoPaketRek>;
  dataDetailInfoRek: infoPaketRek[] = [];
  kodePaket: any;
  namaPaket: any;
  listApplTagid: any;
  dataListApplTag: listApplTag[] = [];
  dealerCode: any;
  dataListBank: listBankPaketRekening2[] = [];
  selectDealerRek: any;
  accountName: any;
  accountNo: any;
  @Input() row: any;
  accNo: any;
  accName: any;
  bankCode: any;
  bankName: any;
  resultProduk: any;
  resultKomisi: any;
  resultDiskon: any;

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
        this.kodePaket = this.row.kodePaket;
        this.namaPaket = this.row.namaPaket;
        this.listApplTagid = this.row.kodePaket;
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

  combinedArray: any[] = [];

  getListBank() {
    this.getDealerCode();
    let parameter = {
      dealer_code: this.dealerCode,
    };
    this.services.postDealer('selectDealerRekening', parameter).subscribe(
      (res) => {
        // console.log(res);
        let arrayListBank: listBankPaketRekening2[] = [];
        res.body.forEach((element: any) => {
          arrayListBank.push({
            bankCode: element.bank_code,
            bankName: element.bank_name,
            acc_no: element.acc_no,
            acc_name: element.acc_name,
          });
          this.dataListBank = arrayListBank;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getInfoDetailrek() {
    let parameter = {
      paket_rek_id: this.row.paketRekId,
    };
    this.dataDetailInfoRek = [];
    // this.dataSourceInfoRek = new MatTableDataSource(this.dataDetailInfoRek);
    this.services
      .postDealer('selectDealerPaketRekeningDtl', parameter)
      .subscribe(
        (res) => {
          console.log(res.body);
          this.resultProduk = res.body[0].bank_code;
          this.resultKomisi = res.body[1].bank_code;
          this.resultDiskon = res.body[2].bank_code;
          this.selectedBankList[0] = this.resultProduk;

          this.dataDetailInfoRek.push(
            {
              tipeRekening: 'Produk',
              bank: this.resultProduk,

              accountNo: '',
              accountName: '',
            },
            {
              tipeRekening: 'Komisi',
              bank: this.resultKomisi,
              accountNo: '',
              accountName: '',
            },
            {
              tipeRekening: 'Diskon',
              bank: this.resultDiskon,
              accountNo: '',
              accountName: '',
            }
          );
          this.dataSourceInfoRek = new MatTableDataSource(
            this.dataDetailInfoRek
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getSelectPktRekDtl() {
    console.log([this.dataListBank]);
    let parameter = {
      paket_rek_id: this.row.paketRekId,
    };
    this.services
      .postDealer('selectDealerPaketRekeningDtl', parameter)
      .subscribe(
        (res) => {
          console.log(res.body);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveEditRekening() {
    console.log(this.listApplTagid);
    console.log(this.selectedBankList[0]);
    console.log(this.selectedBankList[1]);
    console.log(this.selectedBankList[2]);
  }

  backPaketRekening() {
    this.backButtonClicked.emit();
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
