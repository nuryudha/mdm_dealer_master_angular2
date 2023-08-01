import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MainService } from 'src/app/services/main.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listAlamat } from 'src/app/model/list-dealer';

@Component({
  selector: 'app-list-alamat',
  templateUrl: './list-alamat.component.html',
  styleUrls: ['./list-alamat.component.css'],
})
export class ListAlamatComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ListAlamatComponent>,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataListAlamat);
    this.sortPaginator();
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  type = this.data;
  displayedColumns: string[] = [
    'zip_code',
    'kelurahan_name',
    'kecamatan_name',
    'kab_kot_name',
    'provinsi_name',
  ];
  dataSource!: MatTableDataSource<listAlamat>;
  dataListAlamat: listAlamat[] = [];
  search_listAlamat: any;
  description: any;
  dealerCode: any;

  applyFilter() {
    this.dataSource.filter = this.search_listAlamat.trim().toLowerCase();
  }

  sortPaginator() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  searchButton() {
    let tipe = this.type;
    let parameter = {};
    console.log(tipe);
    switch (tipe) {
      case 'kelurahan':
        parameter = {
          kelurahan:
            "AND (KEL.KELURAHAN_ID = '" +
            this.description +
            "' OR KEL.KELURAHAN_NAME LIKE '%" +
            this.description +
            "%')",
        };
        break;

      case 'kecamatan':
        parameter = {
          kelurahan: "AND KEC.KECAMATAN_NAME LIKE '%" + this.description + "%'",
        };
        break;

      case 'provinsi':
        parameter = {
          kelurahan: "AND PROV.PROVINSI_NAME LIKE '%" + this.description + "%'",
        };
        break;

      case 'kode pos':
        parameter = {
          kelurahan: "AND KEL.ZIP_CODE ='" + this.description + "'",
        };
        break;

      default:
        break;
    }
    // console.log(parameter);
    this.dataListAlamat = [];
    this.dataSource = new MatTableDataSource(this.dataListAlamat);
    this.services.postScala('searchKelurahan', parameter).subscribe((res) => {
      res.body.forEach((element: any) => {
        this.dataListAlamat.push({
          zip_code: element.zip_code,
          kelurahan_name: element.kelurahan_name,
          kecamatan_name: element.kecamatan_name,
          kab_kot_name: element.kab_kot_name,
          provinsi_name: element.provinsi_name,
        });
      });
      // this.dataSource = new MatTableDataSource(this.dataListDealer);
      this.sortPaginator();
    });
  }

  selectDealer(dealerCode: string) {
    this.dealerCode = dealerCode;
  }

  chooseCell(dataListDealer: any) {
    this.dialogRef.close(dataListDealer);
  }
}
