import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from 'src/app/shared/modals/product-modal/product-modal.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Category } from '../category/category.component';

export interface Product {
  _id?: number;
  categoryCode?: string;
  productName: string;
  productDescription: string;
  productCode?: string;
  productImg?: string;
  productPrice: number;
  productFlag?: boolean;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productList: Product[] = [];
  categoryList: Category[] = [];

  constructor(
    public dialog: MatDialog,
    private catService: CategoryService,
    private prodService: ProductService
  ) {}

  ngOnInit(): void {
    this.catService.getAllCategory().subscribe((result: any) => {
      this.categoryList = result.data.filter(
        (data: any) => data.categoryFlag === true
      );
    });
    this.prodService.getAllProduct().subscribe((result: any) => {
      this.productList = result.data;
    });
  }

  openProductDialog(prodData: any): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px',
      data: prodData === [] ? [] : prodData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  changeFlag(id: any, event: any) {
    if (event) {
      this.prodService
        .changeFlag(id, { productFlag: false })
        .subscribe((result: any) => {
          this.ngOnInit();
        });
    } else {
      this.prodService
        .changeFlag(id, { productFlag: true })
        .subscribe((result: any) => {
          this.ngOnInit();
        });
    }
  }

  deleteProduct(id: any) {
    this.prodService.deleteProduct(id).subscribe((result: any) => {
      this.ngOnInit();
    });
  }
}
