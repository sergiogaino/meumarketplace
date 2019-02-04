import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { AppStorage } from '../../app-storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: KeycloakProfile;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private appStorage: AppStorage,
  ) { }

  async ngOnInit() {
   this.getUserProfile();
  }

  async getUserProfile() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.appStorage.userDetails =  this.userDetails;
    }
  }

  async goToLogin() {
    await this.router.navigate(['login']);
  }

  async doLogout() {
    this.appStorage.userDetails = null;
    await this.keycloakService.logout();
  }

}
