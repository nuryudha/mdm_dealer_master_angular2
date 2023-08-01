import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listPaket } from 'src/app/model/list-paket';

@Component({
  selector: 'app-paket-tab',
  templateUrl: './paket-tab.component.html',
  styleUrls: ['./paket-tab.component.css'],
})
export class PaketTabComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.info_paket_rek = true;
    this.status_non_aktif = true;
    this.getPaketRekening();
    this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource(this.dataListPaket);
    this.titlePaketRekening = 'Informasi Paket Rekening';
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'kodePaket',
    'namaPaket',
    'applTag',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<listPaket>();
  dataListPaket: listPaket[] = [];
  add_paket_rek = false;
  detail_paket_rek = false;
  info_paket_rek = false;
  status_aktif = false;
  status_non_aktif = false;
  dealerCode: any;
  searchPaketRekening: any;
  titlePaketRekening: any;
  selectedRow: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  getDataDealer() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
      console.log('dealerCode:', code);
    });
  }

  getPaketRekening() {
    this.getDataDealer();
    let parameter = {
      dealer_code: this.dealerCode,
    };
    this.dataListPaket = [];
    this.dataSource = new MatTableDataSource(this.dataListPaket);
    this.services.postDealer('selectDealerPaketRekening', parameter).subscribe(
      (res) => {
        console.log(res.body);
        res.body.forEach((element: any) => {
          this.dataListPaket.push({
            paketRekId: element.paket_rek_id,
            kodePaket: element.paket_rek_code,
            namaPaket: element.mst_paket_desc,
            applTag: element.appl_tag_desc,
            status: element.deleted,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataListPaket);
        this.ngAfterViewInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  tambahPaketRekening() {
    this.titlePaketRekening = 'Tambah Paket Rekening';
    this.add_paket_rek = true;
    this.info_paket_rek = false;
    this.detail_paket_rek = false;
  }

  detailPaketRek(row: any) {
    // console.log(row);
    this.selectedRow = row;
    this.titlePaketRekening = 'Detail Paket Rekening';
    this.add_paket_rek = false;
    this.info_paket_rek = false;
    this.detail_paket_rek = true;
  }

  backPaketRekening() {
    this.titlePaketRekening = 'Informasi Paket Rekening';
    this.add_paket_rek = false;
    this.info_paket_rek = true;
    this.detail_paket_rek = false;
  }

  changeStatus() {
    if (this.status_aktif == true) {
      this.status_non_aktif = true;
      this.status_aktif = false;
    } else {
      this.status_non_aktif = false;
      this.status_aktif = true;
    }
  }
}

// ! ------------------------  DUMMY --------------------------------------------
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  // { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  // { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  // { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  // { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  // { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  // { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  // { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  // { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  // { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
