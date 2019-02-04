import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from './search.service';
import { SearchStorage } from './search.storage';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router,
    private searchService: SearchService,
    private searchStorage: SearchStorage,
    private appService: AppService,
  ) { }

  searchParam: string;

  ngOnInit() {
    this.searchParam = this.appService.getURLSearchParam();
  }

  startSearch(searchText: string) {
    if (searchText !== '') {
      this.router.navigate(['load'], {queryParams: { search: searchText }});
      this.searchService.searchProducts(searchText).subscribe((products) => {
        this.searchStorage.products = this.getProducts(products);
        this.router.navigate(['result'], {queryParams: { search: searchText }});
      }, (error) => {
        this.router.navigate(['load'], {queryParams: { search: searchText, error: 'true' }});
      });
    }
  }

  getProducts(products) {
    const placements = products.placements;
    const docs = placements[0].docs;
    return docs;
  }
}
