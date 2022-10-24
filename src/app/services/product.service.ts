import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

const API_URL = `${environment.BASE_URL}/api/product`;


@Injectable({
  providedIn: 'root'
})
export class ProductService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(API_URL, product, {headers: this.getHeaders});
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete( `${API_URL}/${product.id}`, {headers: this.getHeaders});
  }

  getAllProducts(): Observable<any> {
    return this.http.get(API_URL);
  }
}
