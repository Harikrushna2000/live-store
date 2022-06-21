import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseURL: string = environment.apiURL;

  constructor(private http: HttpClient) {
    this.baseURL += 'category';
  }

  // get all category
  getAllCategory() {
    return this.http.get(this.baseURL);
  }

  // add category
  setCategory(data: any) {
    return this.http.post(this.baseURL, data);
  }

  // get single category
  getCategory(code: string) {
    return this.http.get(this.baseURL + '/' + code);
  }

  // get single category
  updateCategory(code: string, data: any) {
    return this.http.put(this.baseURL + '/' + code, data);
  }

  // change flag category
  changeFlag(code: any, data: any) {
    return this.http.put(this.baseURL + '/flag/' + code, data);
  }

  // delete category
  deleteCategory(code: string) {
    return this.http.delete(this.baseURL + '/' + code);
  }
}
