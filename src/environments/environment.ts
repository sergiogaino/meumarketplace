// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://accounts.demo.attomo.tech/auth',
  realm: 'circle',
  clientId: 'circleapp',
  'credentials': {
    'secret': 'c033dee1-9359-4747-8227-4b40772fb289'
  }
};

// local // dc006e51-b7be-4c1a-a874-f606538954b8
// prod  // c033dee1-9359-4747-8227-4b40772fb289

export const environment = {
  production: false,
  keycloak: keycloakConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
