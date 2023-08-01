import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  getDealer(endPoint: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.dealer_java + endPoint, httpOptions)
      .pipe();
  }

  postDealer(endPoint: string, parameter: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(environment.dealer_java + endPoint, parameter, httpOptions)
      .pipe();
  }

  getScala(endPoint: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.scala_url + endPoint, httpOptions)
      .pipe();
  }
  postScala(endPoint: string, parameter: any): Observable<HttpResponse<any>> {
    console.log(parameter);
    return this.http
      .post<any>(environment.scala_url + endPoint, parameter, httpOptions)
      .pipe();
  }

  getEmployee(endPoint: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.employee_java + endPoint, httpOptions)
      .pipe();
  }
}
