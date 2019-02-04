import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
@Injectable({
  providedIn: 'root',
})

export class AppStorage {

  public userDetails: KeycloakProfile;
  public sessionID: string;

  public constructor() { }

}
