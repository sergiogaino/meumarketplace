import { Component, OnInit } from '@angular/core';
import { SearchStorage } from '../../modules/search/search.storage';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor( private searchStorage: SearchStorage ) { }

  products = this.searchStorage.products;

  ngOnInit() {
  }

}
