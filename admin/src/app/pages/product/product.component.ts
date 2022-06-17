import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  categoryCode: string;
  productName: string;
  productCode: string;
  productImg: string;
  productPrice: number;
  productFlag: boolean;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList: Product[] = [
    {
      id: 1,
      categoryCode: 'C1',
      productCode: 'P1',
      productName: 'Batata Poha',
      productImg: '../../../assets/img/batata-poha.jpg',
      productPrice: 30.00,
      productFlag: true
    },
    {
      id: 2,
      categoryCode: 'C2',
      productCode: 'P1',
      productName: 'Upama',
      productImg: '../../../assets/img/upma.jpg',
      productPrice: 25.00,
      productFlag: false
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
