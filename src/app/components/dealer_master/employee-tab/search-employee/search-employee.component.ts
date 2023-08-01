import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listDealerEmployee } from 'src/app/model/list-employee';
import { DataService } from 'src/app/services/data.service';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css'],
})
export class SearchEmployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SearchEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: MainService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.searchByRadio = '1';
    // this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource(this.dataListDealerEmployee);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'name', 'perusahaan'];
  dataSource!: MatTableDataSource<listDealerEmployee>;
  dataListDealerEmployee: listDealerEmployee[] = [];
  filterButton: any;
  searchEmployee: any;
  searchByRadio: any;
  employeeDesc: any;
  dealerCode: any;
  disabledInput: any;

  // parameter: any;

  applyFilter() {
    this.dataSource.filter = this.searchEmployee.trim().toLowerCase();
  }

  getDataDealerEmployee() {
    const selectedOption = this.searchByRadio;
    let parameter: any;
    console.log(selectedOption);
    if (selectedOption == '1') {
      if (!/^[a-zA-Z\s]*$/.test(this.employeeDesc)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Harus berisi huruf!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        parameter = {
          empl_name: this.employeeDesc,
        };
        this.dataListDealerEmployee = [];
        this.dataSource = new MatTableDataSource(this.dataListDealerEmployee);
        this.services
          .postDealer('detailEmployeeDealerByEmplName', parameter)
          .subscribe(
            (res) => {
              console.log(res.body);
              res.body.forEach((element: any) => {
                this.dataListDealerEmployee.push({
                  empl_no: element.empl_no,
                  name: element.empl_name,
                  perusahaan_code: element.empl_com_code,
                  npk: element.empl_npk,
                  nik: element.empl_com_nik,
                  eff_date: element.eff_date,
                  status: element.empl_status,
                  int_ext: element.empl_int_ext,
                  npwp_no: element.npwp_no,
                  npwp_type: element.npwp_type,
                  pkp_type: element.pkp_type,
                  hp_no: element.empl_hp_no,
                  job_code: element.empl_job_code,
                  job_desc: element.empl_job_desc,
                });
              });
              this.dataSource = new MatTableDataSource(
                this.dataListDealerEmployee
              );
              this.ngAfterViewInit();
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } else if (selectedOption == '2') {
      if (!/^\d+$/.test(this.employeeDesc)) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Harus berisi angka!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        parameter = {
          empl_no: this.employeeDesc,
        };
        this.dataListDealerEmployee = [];
        this.dataSource = new MatTableDataSource(this.dataListDealerEmployee);
        this.services
          .postDealer('searchEmployeeMasterByEmployeeNo', parameter)
          .subscribe(
            (res) => {
              console.log(res.body);
              res.body.forEach((element: any) => {
                this.dataListDealerEmployee.push({
                  empl_no: element.empl_no,
                  name: element.empl_name,
                  perusahaan_code: element.empl_com_code,
                  npk: element.empl_npk,
                  nik: element.empl_com_nik,
                  eff_date: element.eff_date,
                  status: element.empl_status,
                  int_ext: element.empl_int_ext,
                  npwp_no: element.npwp_no,
                  npwp_type: element.npwp_type,
                  pkp_type: element.pkp_type,
                  hp_no: element.empl_hp_no,
                  job_code: element.empl_job_code,
                  job_desc: element.empl_job_desc,
                });
              });
              this.dataSource = new MatTableDataSource(
                this.dataListDealerEmployee
              );
              this.ngAfterViewInit();
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  onInputChange(event: any) {
    const selectedOption = this.searchByRadio;
    let value = event.target.value;
    if (selectedOption == '1') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (selectedOption == '2') {
      value = value.replace(/[^0-9]/g, '');
    }
    event.target.value = value;
    this.employeeDesc = value;
  }

  chooseCell(dataSearchEmployee: any) {
    this.dialogRef.close(dataSearchEmployee);
    console.log(dataSearchEmployee);
  }

  closeSearch() {
    this.dialogRef.close();
  }
}
