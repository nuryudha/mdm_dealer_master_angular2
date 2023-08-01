export interface listPaket {
  paketRekId: any;
  kodePaket: any;
  namaPaket: any;
  applTag: any;
  status: any;
}

export interface listApplTag {
  applTagId: any;
  applTagDesc: any;
}

export interface listBankPaketRekening {
  bankCode: any;
  bankName: any;
  acc_no: any;
  acc_name: any;
  discSelectBank: any;
}

export interface listBankPaketRekening2 {
  bankCode: any;
  bankName: any;
  acc_no: any;
  acc_name: any;

}


export interface allListDetail {
  applTagId: any;
  applTagDesc: any;
  bankCode: any;
  bankName: any;
  acc_no: any;
  acc_name: any;
}

export interface infoPaketRek {
  tipeRekening: any;
  bank: any;
  accountNo: any;
  accountName: any;
}
