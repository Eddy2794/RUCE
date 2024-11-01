// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  apiPofUrl: 'https://192.168.22.14:8081/api',
  apiConfigUrl: 'https://192.168.22.14:8101/api',
  apiPersonasUrl: 'https://192.168.22.14:8091/api',
  apiOrganizacionUrl: 'https://192.168.22.14:4301/api',
  // apiRuceUrl: 'http://localhost:8000/api'
  apiRuceUrl: 'http://localhost:80/api'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
