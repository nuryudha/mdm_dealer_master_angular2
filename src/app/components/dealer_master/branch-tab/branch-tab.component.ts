import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TambahDealerBranchComponent } from './tambah-dealer-branch/tambah-dealer-branch.component';
import { listBranch } from 'src/app/model/list-branch';

@Component({
  selector: 'app-branch-tab',
  templateUrl: './branch-tab.component.html',
  styleUrls: ['./branch-tab.component.css'],
})
export class BranchTabComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private services: MainService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getBranch();
    this.updatedToDate();
    this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource(this.dataListBranch);
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['branchCode', 'branchName', 'status', 'action'];
  // columnDefinitions = [
  //   { def: 'branchCode', label: 'Branch Code', hide:  },
  //   { def: 'branchName', label: 'Branch Name', hide:  },
  // ];
  dataSource!: MatTableDataSource<listBranch>;
  dataListBranch: listBranch[] = [];
  add_employee_form = false;
  employee_form = false;
  status_aktif = false;
  status_non_aktif = false;
  searchText: any;
  dealerCode: any;
  statusText: any;
  tanggalSekarang: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  showFormTambah() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '37%';
    this.dialog
      .open(TambahDealerBranchComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res == 200) {
          this.getBranch();
        }
      });
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  getDataDealer() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
    });
  }

  getBranch() {
    this.getDataDealer();
    let parameter = {
      dealer_code: this.dealerCode,
    };
    this.dataListBranch = [];
    this.dataSource = new MatTableDataSource(this.dataListBranch);
    this.services.postDealer('listMapDealerBranch', parameter).subscribe(
      (res) => {
        res.body.forEach((element: any) => {
          // console.log(element.branch_code);
          if (element.is_deleted == 0) {
            this.statusText = 'Aktif';
            this.status_aktif = false;
            this.status_non_aktif = true;
          } else if (element.is_deleted == 1) {
            this.statusText = 'Non Aktif';
            this.status_aktif = true;
            this.status_non_aktif = false;
          } else {
            this.statusText = 'Error';
          }
          this.dataListBranch.push({
            mst_map_deal_branch: element.mst_map_deal_branch,
            dealer_code: element.dealer_code,
            branchCode: element.branch_code,
            branchName: element.branch_name,
            log_id: element.log_id,
            status: this.statusText,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataListBranch);
        this.ngAfterViewInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatedToDate() {
    const currentDate = new Date();
    if (currentDate) {
      const formattedDate = this.datePipe.transform(currentDate, 'dd/MMM/yyyy');
      if (formattedDate) {
        this.tanggalSekarang = formattedDate.toUpperCase();
      }
    }
  }

  changeStatus(element: any) {
    let booleanStatus: any;
    let memo_log = '';
    if (element.status == 'Aktif') {
      booleanStatus = 1;
      memo_log =
        'U | CONTROLLER_MAP_DEALER_BRANCH/NONAKTIF_MAP_DEALER_BRANCH | FORM-MAP-DEALER-BRANCH | BTN-UPDATE-MAP-DEAL-BRANCH | PROSES UPDATE DATA MAP DEALER BRANCH |';
    } else if (element.status == 'Non Aktif') {
      booleanStatus = 0;
      memo_log =
        'U | CONTROLLER_MAP_DEALER_BRANCH/AKTIF_MAP_DEALER_BRANCH | FORM-MAP-DEALER-BRANCH | BTN-UPDATE-MAP-DEAL-BRANCH | PROSES UPDATE DATA MAP DEALER BRANCH |';
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ERROR',
        text: 'Status tidak ada',
        showConfirmButton: true,
      });
    }
    let parameter = {
      data: {
        mst_map_deal_branch: parseInt(element.mst_map_deal_branch),
        dealer_code: this.dealerCode.toUpperCase(),
        branch_code: element.branchCode.toUpperCase(),
        created_date: '',
        created_by: '',
        updated_date: this.tanggalSekarang.toUpperCase(),
        updated_by: '15997412', //masih hardcode ambildari login skeleton
        log_id: element.log_id.toUpperCase(),
        is_deleted: booleanStatus,
      },
      log: {
        p_userid: '15997412', //masih hardcode ambildari login skeleton
        p_ipaddr: '127.0.0.1', // masih hardcode ambil ip address yang login
        p_memo: memo_log + element.dealer_code + element.branch_code,
        p_branch_code: '0000', //masih hardcode ambildari login skeleton,
      },
    };
    this.services.postDealer('updateMapDealerBranch', parameter).subscribe(
      (res) => {
        console.log(parameter.data.is_deleted);
        if (parameter.data.is_deleted == 1) {
          console.log('Aktif');
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'INFO',
            text: 'Data Berhasil di Non Aktifkan',
            showConfirmButton: true,
          });
        } else if (parameter.data.is_deleted == 0) {
          console.log('Non Aktif');
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'INFO',
            text: 'Data Berhasil di Aktifkan',
            showConfirmButton: true,
          });
        } else {
        }

        this.getBranch();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

// ! ------------------------  DUMMY --------------------------------------------
