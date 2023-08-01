import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { SearchDealerBranchComponent } from '../search-dealer-branch/search-dealer-branch.component';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tambah-dealer-branch',
  templateUrl: './tambah-dealer-branch.component.html',
  styleUrls: ['./tambah-dealer-branch.component.css'],
})
export class TambahDealerBranchComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TambahDealerBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: MainService,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  kodeBranch: any;
  namaBranch: any;
  dealerCode: any;
  tanggalSekarang: any;
  buttonSave: any = true;
  inputKode: any = false;
  inputNama: any = false;

  showSearch() {
    this.getDataDealer();
    this.createdToDate();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '80%';
    this.dialog
      .open(SearchDealerBranchComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.kodeBranch = res.branchCode;
        this.namaBranch = res.branchName;
        if (
          (this.kodeBranch && this.namaBranch) !== (undefined && null && '')
        ) {
          console.log(res);
          this.kodeBranch = res.branchCode;
          this.namaBranch = res.branchName;
          this.buttonSave = false;
          this.inputKode = true;
          this.inputNama = true;
        } else {
          this.buttonSave = true;
        }
      });
  }

  getDataDealer() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
      console.log('dealerCode:', code);
    });
  }

  createdToDate() {
    const currentDate = new Date();
    if (currentDate) {
      const formattedDate = this.datePipe.transform(currentDate, 'dd/MMM/yyyy');
      if (formattedDate) {
        this.tanggalSekarang = formattedDate.toUpperCase();
      }
    }
    console.log(this.tanggalSekarang);
  }

  saveBranch() {
    if ((this.kodeBranch && this.namaBranch) !== undefined) {
      let parameter = {
        data: {
          mst_map_deal_branch: 0,
          dealer_code: this.dealerCode,
          branch_code: this.kodeBranch,
          created_date: this.tanggalSekarang,
          created_by: '15997412',
          updated_date: '',
          updated_by: '',
          log_id: '',
          is_deleted: 0,
        },
        log: {
          p_userid: '15997412',
          p_ipaddr: '::1',
          p_memo:
            'I | CONTROLLER_MAP_DEALER_BRANCH/INSERT_MAP_DEALER_BRANCH | FORM-MAP-DEALER-BRANCH | BTN-MAP-DEAL-BRANCH-SAVE | PROSES INSERT DATA MAP DEALER BRANCH |',
          p_branch_code: '0000',
        },
      };
      this.services.postDealer('insertMapDealerBranch', parameter).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Info',
            text: 'Data Berhasil Disimpan',
            showConfirmButton: true,
          });
          this.dialogRef.close(res.status);
        },
        (error) => {}
      );
    } else {
      console.log('error');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ERROR',
        text: 'Pilih cabang terlebih dahulu',
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        confirmButtonColor: '#58D68D',
      });
    }
  }

  resetBranch() {
    this.kodeBranch = undefined;
    this.namaBranch = undefined;
    this.buttonSave = true;
    this.inputKode = false;
    this.inputNama = false;
  }

  closeRambahDealer() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Konfirmasi',
      text: 'Apakah anda yakin ingin menutup form?',
      showConfirmButton: true,
      confirmButtonText: 'Ya',
      confirmButtonColor: '#335980',
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      cancelButtonColor: '#58D68D',
    }).then((res) => {
      if (res.isConfirmed) {
        this.dialogRef.close();
      } else {
      }
    });
  }
}
