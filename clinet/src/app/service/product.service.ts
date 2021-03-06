import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get('http://localhost:5000/api/product');
  }

  getCategory() {
    return this.http.get('http://localhost:5000/api/category');
  }
}
