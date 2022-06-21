import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL: string = environment.apiURL;

  constructor(private http: HttpClient) {
    this.baseURL += 'product';
  }

  // get all product
  getAllProduct() {
    return this.http.get(this.baseURL);
  }

  // add product
  setProduct(data: any) {
    return this.http.post(this.baseURL, data);
  }

  // get single product
  getProduct(code: string) {
    return this.http.get(this.baseURL + '/' + code);
  }

  // get single product
  updateProduct(code: string, data: any) {
    return this.http.put(this.baseURL + '/' + code, data);
  }

  // change flag product
  changeFlag(code: any, data: any) {
    return this.http.put(this.baseURL + '/flag/' + code, data);
  }

  // delete product
  deleteProduct(code: string) {
    return this.http.delete(this.baseURL + '/' + code);
  }
}
