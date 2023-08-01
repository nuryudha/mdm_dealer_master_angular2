import { Component, OnInit } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-main-dealer',
  templateUrl: './main-dealer.component.html',
  styleUrls: ['./main-dealer.component.css'],
})
export class MainDealerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isLoading = false;
  animation = true; // properti kustom

  onTabChange(event: MatTabChangeEvent) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // set delay here as needed
  }

  selectedIndex = 0;
}
