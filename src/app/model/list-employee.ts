export interface listEmployee {
  empl_no: any;
  name: any;
  npk: any;
  nik: any;
  job: any;
  status: any;
  dtl_id: any;
}

export interface listDealerEmployee {
  empl_no: any;
  name: any;
  perusahaan_code: any; //no need
  npk: any;
  nik: any;
  eff_date: any;
  status: any;
  int_ext: any; // external
  npwp_no: any;
  npwp_type: any;
  pkp_type: any;
  hp_no: any;
  job_code: any;
  job_desc: any;
}

export interface listJobs {
  empl_no: any;
  job_code: any;
  job_desc: any;
}

export interface listEmployeeStat {
  code: any;
  name: any;
}
