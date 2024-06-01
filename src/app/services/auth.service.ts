import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let headerOptions: HttpHeaders;
    let dubReq: any;
    if (req.url == 'login/') {
      headerOptions = new HttpHeaders({});
    } else {
      headerOptions = new HttpHeaders({
        Authorization: 'Token ' + localStorage.getItem('token'),
      });
    }
    dubReq = req.clone({
      url: this.URL + req.url,
      headers: headerOptions,
    });

    return next.handle(dubReq);
  }

  login(payload: any) {
    return this.http.post('login/', payload);
  }
}
