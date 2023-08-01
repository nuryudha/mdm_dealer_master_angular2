import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { listBank, listCabangBank } from 'src/app/model/list-rekening';

import { MainService } from 'src/app/services/main.service';
import { MatOption } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tambah-rekening',
  templateUrl: './tambah-rekening.component.html',
  styleUrls: ['./tambah-rekening.component.css'],
})
export class TambahRekeningComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TambahRekeningComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private services: MainService,
    private formBuilder: FormBuilder
  ) {
    this.cekValidasi();
  }

  ngOnInit(): void {
    this.getListBank();
    // this.bankAccount = this.data.bankAccount;
  }
  form!: FormGroup;
  dataListBank: listBank[] = [];
  dataListCabangBank: listCabangBank[] = [];
  kodeBank: any;
  namaCabang: any;
  selectCabang: any = true;
  noAccount: any;
  inputNo: any = true;
  namaAccount: any;
  inputName: any = true;
  bankAccount: any;
  filteredBank: any = this.dataListBank;
  filteredCabangBank: any = this.dataListCabangBank;
  disabledCabang: any = true;

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
    console.log('=========', this.form.controls.bankAccount);
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
      this.disabledCabang = false;
      this.getCabang();
    }
  }

  getCabang() {
    let parameter = {
      bank_code: this.form.value.bankAccount,
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
    console.log('=========', this.form.controls.namaCabang);
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

  cekValidasi() {
    this.form = this.formBuilder.group({
      bankAccount: ['', [Validators.required]],
      namaCabang: ['', [Validators.required]],
      noAccount: ['', [Validators.required]],
      namaAccount: ['', [Validators.required]],
    });
  }

  saveRekening() {
    console.log(this.bankAccount);
    console.log(this.namaCabang);
    console.log(this.noAccount);
    console.log(this.namaAccount);
  }

  resetRekening() {
    this.form.reset();
    this.disabledCabang = true;
  }

  closeSearch() {
    this.dialogRef.close();
  }

  // ? -------------------------TEST------------------------
}
