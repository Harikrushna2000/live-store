import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from 'src/app/shared/modals/category-modal/category-modal.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';

export interface Category {
  _id?: object;
  categoryCode?: string;
  categoryName: string;
  categoryImg?: File;
  categoryFlag?: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];

  constructor(public dialog: MatDialog, private catService: CategoryService) {}

  ngOnInit(): void {
    this.catService.getAllCategory().subscribe((result: any) => {
      this.categoryList = result.data;
    });
  }

  openCategoryDialog(catData: any): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: catData === [] ? [] : catData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  changeFlag(id: any, event: any) {
    if (event) {
      this.catService
        .changeFlag(id, { categoryFlag: false })
        .subscribe((result: any) => {
          this.ngOnInit();
        });
    } else {
      this.catService
        .changeFlag(id, { categoryFlag: true })
        .subscribe((result: any) => {
          this.ngOnInit();
        });
    }
  }

  deleteCategory(id: any) {
    this.catService.deleteCategory(id).subscribe((result: any) => {
      this.ngOnInit();
    });
  }
}
