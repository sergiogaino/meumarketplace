import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStorage } from './app-storage';
@Injectable({
  providedIn: 'root',
})

export class AppService {

  private currentPriceUrl = 'http://api.coindesk.com/v1/bpi/currentprice.json';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private appStorage: AppStorage,
  ) { }

  getURLSearchParam() {

    let param;

    this.activatedRoute.queryParams.subscribe(params => {
        param = params['search'];
    });

    return param;
  }

  getUserId() {
    return this.appStorage.userDetails ? this.appStorage.userDetails.username : '';
  }

  async getBanners(): Promise<Array<any>> {
    const userId = this.getUserId();
    await this.createSessionId();
    const sessionId = this.appStorage.sessionID;
    // tslint:disable-next-line:max-line-length
    const response = await this.http.get<any>(`http://recs.richrelevance.com/rrserver/api/personalize?apiKey=0aab62f5a83d8d64&apiClientKey=49595aac088e702a&sessionId=${sessionId}&userId=${userId}&placements=home_page.content_hero1|home_page.content_hero2|home_page.content_hero3|home_page.content_hero4`).toPromise();
    const banners = [];
    response.placements.forEach(banner => {
      banners.push(banner.creatives[0]);
    });

    return banners;
  }

  async getRecomendations(placements, productId, categoryId?): Promise<Array<any>> {
    const userId = this.getUserId();
    await this.createSessionId();
    const sessionId = this.appStorage.sessionID;
    // tslint:disable-next-line:max-line-length
    let url = `https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=0aab62f5a83d8d64&apiClientKey=49595aac088e702a&userId=${userId}&includeMVTData=true&includeStrategyData=true&sessionId=${sessionId}&productId=${productId}&placements=${placements}`;
    if (categoryId && categoryId.length && categoryId.length > 0) {
     url = url + `&categoryId=${categoryId[0]}`;
    }
    // tslint:disable-next-line:max-line-length
    const response = await this.http.get<any>(url).toPromise();
    const recommendedProducts = response.placements;
    return recommendedProducts;
  }

  // Used for send infotmations to Reach Relevance
  async clickUrl (url: string): Promise<boolean> {
    await this.http.get<any>(url).toPromise();
    return true;
  }

  private createSessionId() {
    const sessionId = localStorage.getItem('circular-session');
    if (!sessionId) {
      const newId = this.createGUID();
      localStorage.setItem('circular-session', newId);
      this.appStorage.sessionID = newId;
    } else {
      this.appStorage.sessionID = sessionId;
    }
  }

  private createGUID() {
    const S4 = this.createS4;
    const guid = (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    return guid;
  }

  private createS4() {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

}
