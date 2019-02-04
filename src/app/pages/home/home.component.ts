import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recomendations = [];
  showLoadRecomendations = true;
  showRecomendationError = false;
  recomendationErrorMessage = 'Não foi possivel obter as recomendações';

  constructor(
    private appService: AppService,
    ) { }

  ngOnInit() {
    this.listRecomendations();
  }

  async listRecomendations() {
    await this.appService.getRecomendations('home_page.recs_1|home_page.recs_promo', '')
    .then(recomendations => {
      this.recomendations = recomendations;
    })
    .catch(error => {
      this.showRecomendationError = true;
    })
    .finally(() => {
      this.showLoadRecomendations = false;
    });
  }

}
