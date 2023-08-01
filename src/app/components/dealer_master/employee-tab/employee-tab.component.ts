import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';

import { DataService } from 'src/app/services/data.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { listEmployee } from 'src/app/model/list-employee';

@Component({
  selector: 'app-employee-tab',
  templateUrl: './employee-tab.component.html',
  styleUrls: ['./employee-tab.component.css'],
})
export class EmployeeTabComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.employee_form = true;
    // this.detail_employee_form = true;
    // this.add_employee_form = true;
    this.getDataDealer();
    this.getEmployee();

    this.sortPaginator();
    this.dataSource = new MatTableDataSource(this.dataListEmployee);
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'no',
    'name',
    'npk',
    'nik',
    'job',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<listEmployee>;
  dataListEmployee: listEmployee[] = [];
  add_employee_form = false;
  detail_employee_form = false;
  employee_form = false;
  search_employee: any;
  search_employee_insen: any;
  dealerCode: any;
  dealerName: any;
  statusText: any;
  selectedRow: any;

  applyFilter() {
    this.dataSource.filter = this.search_employee.trim().toLowerCase();
    this.dataSource.filter = this.search_employee_insen.trim().toLowerCase();
  }

  sortPaginator() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  getDataDealer() {
    this.dataService.dealerCode$.subscribe((code) => {
      this.dealerCode = code;
      console.log('dealerCode:', code);
    });
  }

  getEmployee() {
    let parameter = {
      empl_com_br: this.dealerCode,
    };
    this.dataListEmployee = [];
    this.dataSource = new MatTableDataSource(this.dataListEmployee);
    this.services
      .postDealer('listEmployeeMasterDtlByCombr', parameter)
      .subscribe(
        (res) => {
          console.log(res.body);
          res.body.forEach((element: any) => {
            if (element.empl_status == '01') {
              this.statusText = 'Aktif';
            } else {
              this.statusText = 'Tidak Akif';
            }
            this.dataListEmployee.push({
              empl_no: element.empl_no,
              name: element.empl_name,
              npk: element.empl_npk,
              nik: element.empl_com_nik,
              job: element.empl_job_desc,
              status: this.statusText,
              dtl_id: element.mst_employee_dtl_id,
            });
          });
          // this.sortPaginator();
          this.dataSource = new MatTableDataSource(this.dataListEmployee);
          this.sortPaginator();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  showFormTambah() {
    this.add_employee_form = true;
    this.detail_employee_form = false;
    this.employee_form = false;
  }

  showFormDetail(row: any) {
    // TODO : CAN CHANGE THIS ---------
    this.dataService.setNoEmployee(row.empl_no);
    this.dataService.setDetailId(row.dtl_id);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.selectedRow = row;
    this.add_employee_form = false;
    this.detail_employee_form = true;
    this.employee_form = false;
  }

  backFormEmployee() {
    this.getEmployee();
    this.add_employee_form = false;
    this.detail_employee_form = false;
    this.employee_form = true;
  }
}
