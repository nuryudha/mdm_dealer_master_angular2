import { Component, OnInit, ViewChild } from '@angular/core';

import { MainService } from 'src/app/services/main.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listDealer } from 'src/app/model/list-dealer';

@Component({
  selector: 'app-list-dealer',
  templateUrl: './list-dealer.component.html',
  styleUrls: ['./list-dealer.component.css'],
})
export class ListDealerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListDealerComponent>,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataListDealer);
    this.sortPaginator();
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['dealerCode', 'dealerName'];
  dataSource!: MatTableDataSource<listDealer>;
  dataListDealer: listDealer[] = [];
  // dataSearchListDealer: listDealer[] = [];
  searchByRadio: '1' | '2' = '2';
  search_listDealer: any;
  description: any;
  dealerCode: any;

  applyFilter() {
    this.dataSource.filter = this.search_listDealer.trim().toLowerCase();
  }

  sortPaginator() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  searchButton() {
    const selectedOption = this.searchByRadio;
    let parameter = {
      tipe: selectedOption,
      dealer: this.description,
      branch: '0000',
    };
    this.dataListDealer = [];
    this.dataSource = new MatTableDataSource(this.dataListDealer);
    // console.log(this.services.getList('listDealerMasterBy/', parameter).subscribe());
    this.services
      .postDealer('listDealerMasterBy/', parameter)
      .subscribe((res) => {
        res.body.forEach((element: any) => {
          this.dataListDealer.push({
            dealerCode: element.dealercode,
            dealerName: element.dealername,
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
