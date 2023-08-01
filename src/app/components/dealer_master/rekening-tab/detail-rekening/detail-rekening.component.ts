import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { listBank, listCabangBank } from 'src/app/model/list-rekening';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-rekening',
  templateUrl: './detail-rekening.component.html',
  styleUrls: ['./detail-rekening.component.css'],
})
export class DetailRekeningComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailRekeningComponent>,
    private services: MainService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.detailRekening();
    this.getListBank();
    this.getCabang();
  }

  dataRekening: any;
  bankAccount: any;
  dataListBank: listBank[] = [];
  filteredBank: any = this.dataListBank;
  namaCabang: any;
  dataListCabangBank: listCabangBank[] = [];
  filteredCabangBank: any = this.dataListCabangBank;
  rekeningCode: any;
  noAccount: any;
  namaAccount: any;
  statusRekening: any;

  getListBank() {
    this.services.getEmployee('listBank').subscribe(
      (res) => {
        console.log(res.body);
        let arrayListBank: listBank[] = [];
        res.body.forEach((element: any) => {
          arrayListBank.push({
            bankCode: element.bank1.bank_code,
            bankName: element.bank1.bank_code + ' - ' + element.bank1.bank_name,
          });
        });
        this.dataListBank = arrayListBank;
        this.filteredBank = this.dataListBank;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangeBank(selectedValue: string) {
    console.log('=========', selectedValue);
    this.bankAccount == selectedValue;
    // console.log('=========', this.form.controls.bankAccount);
    if (!selectedValue) {
      console.log('Belum di Select');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ERROR',
        text: 'Bank kosong',
        showConfirmButton: true,
      });
    } else {
      console.log('true');
      // this.disabledCabang = false;
      this.getCabang();
    }
  }

  getCabang() {
    let parameter = {
      bank_code: this.bankAccount,
    };
    this.services.postDealer('getListBankIndonesia', parameter).subscribe(
      (res) => {
        let arrayListCabangBank: listCabangBank[] = [];
        console.log(res);
        res.body.forEach((element: any) => {
          arrayListCabangBank.push({
            bankBiCode: element.bank_bi_code,
            bankCity: element.bank_city,
            bankBranch: element.bank_branch,
            bankCabang: element.bank_city + '_' + element.bank_branch,
          });
        });
        this.dataListCabangBank = arrayListCabangBank;
        this.filteredCabangBank = this.dataListCabangBank;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangeCabang(selectedValue: string) {
    console.log('=========', selectedValue);
    // console.log('=========', this.form.controls.namaCabang);
    if (!selectedValue) {
      console.log('Belum di Select');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ERROR',
        text: 'Bank kosong',
        showConfirmButton: true,
      });
    } else {
      console.log('true');
    }
  }

  detailRekening() {
    this.dataRekening = this.data.element;
    console.log(this.dataRekening);
    console.log(this.dataRekening.rekeningCode);
    this.rekeningCode = this.dataRekening.rekeningCode;
    console.log(this.dataRekening.bankCode);
    this.bankAccount = this.dataRekening.bankCode;
    console.log(this.dataRekening.bankBranch);
    this.namaCabang = this.dataRekening.bankBranch;
    console.log(this.dataRekening.accountNo);
    this.noAccount = this.dataRekening.accountNo;
    console.log(this.dataRekening.accountName);
    this.namaAccount = this.dataRekening.accountName;
    console.log(this.dataRekening.accountStatus);
    this.statusRekening = this.dataRekening.accountStatus;
  }

  saveRekening() {
    console.log(this.rekeningCode);
    console.log(this.bankAccount);
    console.log(this.namaCabang);
    console.log(this.noAccount);
    console.log(this.namaAccount);
    console.log(this.statusRekening);
  }

  closeDetail() {
    this.dialogRef.close();
  }
}
