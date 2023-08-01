import * as _moment from 'moment';

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { listEmployeeStat, listJobs } from 'src/app/model/list-employee';

import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SearchEmployeeComponent } from '../search-employee/search-employee.component';
import { default as _rollupMoment } from 'moment';

const idLocale = {
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Ags',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
  weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  weekdaysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  weekdaysMin: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
};

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
    monthDayLabel: 'DD MMM',
  },
};

@Component({
  selector: 'app-tambah-employee',
  templateUrl: './tambah-employee.component.html',
  styleUrls: ['./tambah-employee.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TambahEmployeeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<MomentDateAdapter>,
    private services: MainService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.dateAdapter.setLocale('id');
    moment.locale('id', idLocale);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'accountNo',
    'accountName',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  inputNoEmp: any;
  inputNpk: any;
  inputNama: any;
  inputNik: any;
  inputEffDate: any;
  date = new FormControl('');
  dataListEmplStat: listEmployeeStat[] = [];
  inputEmpStat: any;
  inputJobStat: any;
  inputListJob: any;
  dataListJobs: listJobs[] = [];
  inputNpwp0: any;
  inputNpwp1: any;
  inputNpwp2: any;
  inputNpwp3: any;
  inputNpwp4: any;
  inputNpwp5: any;
  inputNpwpType: any;
  inputPkpType: any;
  inputNoHp: any;
  inputEmail: any;
  dealerCode: any;

  showSearch() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '80%';
    this.dialog
      .open(SearchEmployeeComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.inputNoEmp = res.empl_no;
        this.inputNpk = res.npk;
        this.inputNama = res.name;
        this.inputNik = res.nik;
        this.inputEffDate = moment(res.eff_date, 'DD-MMM-YYYY').format(
          'YYYY-MM-DD'
        );
        this.inputEmpStat = res.status;
        this.getEmployeeStatus();
        this.inputJobStat = res.int_ext;
        this.getListJob();
        const noNPWP = res.npwp_no.split(/[^\d]+/);
        this.inputNpwp0 = noNPWP[0];
        this.inputNpwp1 = noNPWP[1];
        this.inputNpwp2 = noNPWP[2];
        this.inputNpwp3 = noNPWP[3];
        this.inputNpwp4 = noNPWP[4];
        this.inputNpwp5 = noNPWP[5];
        this.inputNpwpType = res.npwp_type;
        this.inputPkpType = res.pkp_type;
        if (res.empl_hp_no == null) {
          this.inputNoHp = 'XXXXXXXXXXXXXXXXXXXX';
        } else {
          this.inputNoHp = res.empl_hp_no;
        }
      });
  }

  getEmployeeStatus() {
    this.services.getScala('listTableMasterEmplStatus').subscribe(
      (res) => {
        console.log(res);
        res.body.forEach((element: any) => {
          this.dataListEmplStat.push({
            code: element.code,
            name: element.name,
          });
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

  getListJob() {
    this.getDealerCode();
    let parameter = {
      empl_no: this.inputNoEmp,
      empl_com_br: this.dealerCode,
    };
    this.services
      .postDealer('detailDariSearchEmployeeJobs', parameter)
      .subscribe(
        (res) => {
          console.log(res.body);
          res.body.forEach((element: any) => {
            this.dataListJobs.push({
              empl_no: element.empl_no,
              job_code: element.empl_job_code,
              job_desc: element.empl_job_desc,
            });
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveEmployee() {
    let parameter = {};
  }

  // ? ------------------------ TEST -----------------------------------
  testSave() {
    console.log(this.inputEffDate);
    const selectedDate = moment(this.date.value).format('DD-MMM-YYYY');
    console.log(selectedDate);
    console.log(this.inputListJob);
    console.log(this.inputNik);
    console.log(this.inputEmail);
  }

  testReset() {
    this.inputNoEmp = '';
    this.inputNpk = '';
    this.inputNama = '';
    this.inputNik = '';
    this.inputEffDate = '';
    this.inputEmpStat = '';
    this.inputJobStat = '';
    this.inputListJob = '';
    this.inputNpwp0 = '';
    this.inputNpwp1 = '';
    this.inputNpwp2 = '';
    this.inputNpwp3 = '';
    this.inputNpwp4 = '';
    this.inputNpwp5 = '';
    this.inputNpwpType = '';
    this.inputPkpType = '';
    this.inputNoHp = '';
    this.inputEmail = '';
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
