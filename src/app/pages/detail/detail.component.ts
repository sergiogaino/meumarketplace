import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';
import { AppService } from '../../app.service';
import { Response } from 'selenium-webdriver/http';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  productId: string;
  categoryId: string;
  productDetail: any;
  recomendations = [];
  showLoadRecomendations = true;
  showLoadDetails = true;
  showError = false;
  errorMessage = '';
  showRecomendationError = false;
  recomendationErrorMessage = 'Não foi possivel obter as recomendações';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailService: DetailService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getQueryParms();
    this.getProductDetail();
    this.listRecomendations();
  }

  getQueryParms() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      this.categoryId = params['categoryId'];
    });
  }

  getProductDetail() {
    this.detailService.getProductInformations(this.productId).subscribe((productDetail) => {
      if (productDetail && productDetail.childSKUs && productDetail.childSKUs[0] && productDetail.childSKUs[0].listPrice) {
        productDetail.salePrice = productDetail.childSKUs[0].listPrice;
      }
      productDetail.salePrice = (productDetail.salePrice.toString()).replace('.', '');
      this.productDetail = productDetail;
      this.showLoadDetails = false;
    }, response => {
      this.errorMessage = 'Não foi possível carregar o produto';
      this.showError = true;
      this.showLoadDetails = false;
    });
  }

  async listRecomendations() {
    await this.appService.getRecomendations('item_page.recs_1|item_page.recs_2', this.productId, this.categoryId)
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

  goToConfirmation(product) {
    this.detailService.sendToCamunda(product).subscribe( response => {
      this.router.navigate(['confirmation'], {queryParams: { product }});
    });
  }
}
