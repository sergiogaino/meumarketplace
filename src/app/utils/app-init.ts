import { KeycloakService } from 'keycloak-angular';

import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'check-sso',
            checkLoginIframe: false
          },
          bearerExcludedUrls: [
            'home',
            'https://recs.richrelevance.com',
            'result',
            'load',
            'detail',
            'confirmation',
            'https://',
            'http://'
          ]
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
