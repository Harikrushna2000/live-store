import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/pages/category/category.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  categoryForm: any = FormGroup;
  selectedFile!: File;
  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category[] | any,
    private catService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      categoryImg: new FormControl(''),
    });
    if (this.data.length !== 0) {
      this.setValue();
    }
  }

  setValue() {
    this.categoryForm.setValue({
      categoryName: this.data.categoryName,
      categoryImg: '',
    });
  }
  onUploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submitForm() {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('categoryName', this.categoryForm.value.categoryName);
      formData.append('categoryImg', this.selectedFile);
      if (this.data.length !== 0) {
        this.catService
          .updateCategory(this.data._id, formData)
          .subscribe((result: any) => {});
      } else {
        this.catService.setCategory(formData).subscribe((result: any) => {});
      }
      this.dialogRef.close();
    }
  }

  closeCategoryModal(): void {
    this.dialogRef.close();
  }
}
