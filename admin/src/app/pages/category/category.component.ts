import { Component, OnInit } from '@angular/core';

interface Category {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  categoryImg: string;
  categoryFlag: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [
    {
      categoryId: 1,
      categoryCode: 'C1',
      categoryName: 'Breakfast',
      categoryImg: '../../../assets/img/batata-poha.jpg',
      categoryFlag: true
    },
    {
      categoryId: 2,
      categoryCode: 'C2',
      categoryName: 'Lunch',
      categoryImg: '../../../assets/img/upma.jpg',
      categoryFlag: false
    },
    {
      categoryId: 3,
      categoryCode: 'C3',
      categoryName: 'Dinner',
      categoryImg: '../../../assets/img/upma.jpg',
      categoryFlag: true
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {

  }

  closeModal() {

  }

}
