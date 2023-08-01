// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  company_java: 'http://company-release-java-dev.apps.ocp4dev.muf.co.id/',
  dealer_java: 'http://mdm-dealer-release-java-dev.apps.ocp4dev.muf.co.id/',
  employee_java: 'http://mdm-employee-release-java-dev.apps.ocp4dev.muf.co.id/',
  asset_master_java: 'http://mdm-asset-java-dev.apps.ocp4dev.muf.co.id/',
  lite_dms:
    'http://dmstest.muf.co.id/LiteDMS/WebServices/DocWS/LDMSDocWS.svc?wsdl',
  get_employee_iam: 'http://iam-core-dev.apps.ocp4dev.muf.co.id/',
  scala_url:
    'http://mdm-skeleton-java-dev.apps.ocp4dev.muf.co.id/gateway/MDM_SCALA/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
