import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/pages/category/category.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from 'src/app/pages/product/product.component';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  productForm: any = FormGroup;
  categoryList: Category[] = [];
  selectedFile!: File;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product[] | any,
    private catService: CategoryService,
    private prodService: ProductService
  ) {}

  ngOnInit(): void {
    this.catService.getAllCategory().subscribe((result: any) => {
      this.categoryList = result.data.filter(
        (data: any) => data.categoryFlag === true
      );
    });
    this.productForm = new FormGroup({
      categoryCode: new FormControl('', [Validators.required]),
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      productPrice: new FormControl('', [Validators.required]),
      productImg: new FormControl(''),
    });
    if (this.data.length !== 0) {
      this.setValue();
    }
  }

  setValue() {
    this.productForm.setValue({
      categoryCode: this.data.categoryCode,
      productName: this.data.productName,
      productDescription: this.data.productDescription,
      productPrice: this.data.productPrice,
      productImg: '',
    });
  }

  onUploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '500px',
      data: [],
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  submitForm() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('categoryCode', this.productForm.value.categoryCode);
      formData.append('productName', this.productForm.value.productName);
      formData.append(
        'productDescription',
        this.productForm.value.productDescription
      );
      formData.append('productPrice', this.productForm.value.productPrice);
      formData.append('productImg', this.selectedFile);
      if (this.data.length !== 0) {
        this.prodService
          .updateProduct(this.data._id, formData)
          .subscribe((result: any) => {});
      } else {
        this.prodService.setProduct(formData).subscribe((result: any) => {});
      }
      this.dialogRef.close();
    }
  }

  closeProductModal(): void {
    this.dialogRef.close();
  }
}
