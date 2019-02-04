import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class DetailService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getProductInformations(params: string): Observable<any> {
        const headers = new HttpHeaders({
        'Authorization': `Basic YWRtaW46YWRtaW4=`
        });
        const options = { headers: headers };
        return this.http.get<any>(`https://ccstore-test-zdqa.oracleoutsourcing.com/ccstoreui/v1/products/${params}`, options);
    }

    sendToCamunda(productName: string): Observable<any> {
        const body = { data : productName };
        return this.http.post('https://api.gateway.attomo.tech/produce', body);
    }

}
