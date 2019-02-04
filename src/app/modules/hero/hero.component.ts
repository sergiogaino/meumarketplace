import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  config: SwiperOptions = {
    autoplay: 3000, // Autoplay option having value in milliseconds
    initialSlide: 0, // Slide Index Starting from 0
    slidesPerView: 1, // Slides Visible in Single View Default is 1
    pagination: '.swiper-pagination', // Pagination Class defined
    paginationClickable: true, // Making pagination dots clicable
    nextButton: '.swiper-button-next', // Class for next button
    prevButton: '.swiper-button-prev', // Class for prev button
    spaceBetween: 0 // Space between each Item
  };

  banners;
  showError = false;
  errorMessage = 'Não foi possível carregar os banners';

  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.loadBanners();
  }

  async loadBanners() {
    await this.appService.getBanners()
    .then(banners => {
      this.banners = banners;
    })
    .catch(error => {
      this.showError = true;
    });
  }

  sendInformationToRR(url) {
    // this.appService.clickUrl(url); o link está vindo errado da rr.
    console.log('Informação do click no banner enviadas para a RR');
  }
}
