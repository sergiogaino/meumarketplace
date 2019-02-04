import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product;

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.producParser();
  }

  producParser() {
    if (this.product.hasOwnProperty('clickTrackingURL')) {
      this.product['clickUrl'] = this.product.clickTrackingURL;
    }
    if (this.product.hasOwnProperty('imageURL')) {
      this.product['imageId'] = this.product.imageURL;
    }
  }

  viewProductDetail(productId, categoryId, clickUrl) {
    this.appService.clickUrl(clickUrl).then(result => {
      this.router.navigate(['load']).then(a => {
        this.router.navigate(['detail'], {queryParams: { productId,  categoryId }});
      });
    });

  }

}
