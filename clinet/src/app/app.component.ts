import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  categoryData: any[] = [];
  productData: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //category
    this.productService.getCategory().subscribe((result: any) => {
      this.categoryData = result.data.filter(
        (res: any) => res.categoryFlag === true
      );
      console.log(this.categoryData);
    });

    //Product
    this.productService.getProduct().subscribe((result: any) => {
      const temp = result.data.filter((res: any) => res.productFlag === true);
      this.categoryData.forEach((cat) => {
        temp.forEach((prod: any) => {
          if (prod.categoryCode === cat.categoryCode) {
            this.productData.push(prod);
          }
        });
      });
    });
    console.log(' this.productData::', this.productData);
  }
  allProduct() {
    this.productService.getProduct().subscribe((result: any) => {
      this.productData = result.data.filter(
        (res: any) => res.productFlag === true
      );
    });
  }
  filterProduct(code: string) {
    this.productService.getProduct().subscribe((result: any) => {
      this.productData = result.data.filter(
        (res: any) => res.categoryCode === code
      );
    });
  }
}
