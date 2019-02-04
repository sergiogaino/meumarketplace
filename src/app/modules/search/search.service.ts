import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppStorage } from '../../app-storage';

@Injectable({
  providedIn: 'root',
})

export class SearchService {

  constructor(
    private http: HttpClient,
    private appStorage: AppStorage,
  ) { }

  getUserId() {
    return this.appStorage.userDetails ? this.appStorage.userDetails.username : '';
  }

  searchProducts(params: string): Observable<any> {
    // const apiKey = 'e20fd45b1e19a8c6'; // Riachuelo - Teste
    const apiKey = '0aab62f5a83d8d64'; // Esfera
    const sessionId = this.appStorage.sessionID;
    const userId = this.getUserId();
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(`https://recs.richrelevance.com/rrserver/api/find/v1/${apiKey}?facetDepth=5&lang=pt&log=true&placement=search_page.find&query=${params}&rows=30&sessionId=${sessionId}&start=0&userId=${userId}`);
  }
}
