import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  dealerCode$ = new BehaviorSubject<any>(null);
  dealerName$ = new BehaviorSubject<any>(null);
  noEmployee$ = new BehaviorSubject<any>(null);
  detailId$ = new BehaviorSubject<any>(null);

  setDealerCode(code: any) {
    this.dealerCode$.next(code);
  }

  setDealerName(name: any) {
    this.dealerName$.next(name);
  }

  setNoEmployee(empl_no: any) {
    this.noEmployee$.next(empl_no);
  }

  setDetailId(dtl_id: any) {
    this.detailId$.next(dtl_id);
  }
}
