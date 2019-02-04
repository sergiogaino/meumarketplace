import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  searchParam: string;
  showError = false;
  errorMessage = 'Não foi possível realizar a busca';

  ngOnInit() {
    this.searchParam = this.appService.getURLSearchParam();
    this.activatedRoute.queryParams.subscribe(params => {
    this.showError = params['error'] === 'true';
  });
  }

}
