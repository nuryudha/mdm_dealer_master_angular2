import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data.service';
import { ListDealerComponent } from './list-dealer/list-dealer.component';
import { ListAlamatComponent } from './list-alamat/list-alamat.component';

@Component({
  selector: 'app-dealer-tab',
  templateUrl: './dealer-tab.component.html',
  styleUrls: ['./dealer-tab.component.css'],
})
export class DealerTabComponent implements OnInit {
  constructor(
    private dialog: MatDialog, 
    private dataService: DataService) {}

  ngOnInit(): void {}

  showListDealer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    this.dialog
      .open(ListDealerComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.dataService.setDealerCode(res.dealerCode);
          this.dataService.setDealerName(res.dealerName);
        }
      });
  }

  showDialog(type: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    dialogConfig.data = type;
    this.dialog
    .open(ListAlamatComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          
        }
      })
  }
}
