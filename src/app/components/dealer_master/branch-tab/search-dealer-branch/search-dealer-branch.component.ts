import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listSearchBranch } from 'src/app/model/list-branch';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-search-dealer-branch',
  templateUrl: './search-dealer-branch.component.html',
  styleUrls: ['./search-dealer-branch.component.css'],
})
export class SearchDealerBranchComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SearchDealerBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.getListBranch();
    this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource(this.dataSearchBranch);
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['branchCode', 'branchName'];
  dataSource = new MatTableDataSource<listSearchBranch>();
  searchText: any;
  dataSearchBranch: listSearchBranch[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  getListBranch() {
    this.dataSearchBranch = [];
    this.dataSource = new MatTableDataSource(this.dataSearchBranch);
    this.services.getDealer('listMasterBranch').subscribe(
      (res) => {
        console.log(res);
        res.body.forEach((element: any) => {
          this.dataSearchBranch.push({
            branchCode: element.BRANCH_CODE,
            branchName: element.BRANCH_NAME,
            branchParent: element.BRANCH_PARENT,
            branchType: element.BRANCH_TYPE,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataSearchBranch);
        this.ngAfterViewInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  chooseCell(dataTambahDealer: any) {
    this.dialogRef.close(dataTambahDealer);
    // console.log(dataTambahDealer);
  }

  closeSearch() {
    this.dialogRef.close();
  }
}
