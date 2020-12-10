import { Component, OnInit } from '@angular/core';
import { Category } from '../add-category/category';  
import { CategoryService } from '../add-category/category.service';  
import { AngularFirestore } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {  
  updateCategory: boolean = false;  
  categorys: Category[];  
  Category: Category = new Category();  
  
  categoryId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean;  
  isDelete: boolean;  
  
  constructor(private categoryService: CategoryService,  
    private angularFirestore: AngularFirestore  
  ) {  
    this.getAllCategory();  
  }  
  
  getAllCategory() {  
    this.categoryService.getAllCategory().subscribe((data: any) => {  
      this.categorys = data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Category;  
      });  
      console.log(this.categorys);  
  
    });  
  }  
  
  onSubmit(f) {  
    if (f.form.valid) {  
      const CategoryData = JSON.parse(JSON.stringify(this.Category));  
      debugger;  
      if (this.categoryId == null) {  
        this.categoryService.addCategoryInforamtion(CategoryData);  
      } else {  
        this.categoryService.updateCategoryInforamtion(this.categoryId, CategoryData);  
      }  
      this.Category = new Category();  
      f.submitted = false;  
      this.formSubmitted = true;  
      this.updateCategory = false;  
      setInterval(() => {  
        this.formSubmitted = false;  
  
      }, 2000);  
    }  
  }  
  
  //Edit Category method  
  editCategory(categoryId) {  
    this.categoryId = categoryId;  
    let obj: any = this.categorys.filter((x: any) => {  
      return x.id == categoryId;  
    });  
    this.updateCategory= true;  
    this.Category = obj[0];  
  }  
  
  // Delete Category method  
  deleteCategory(categoryId) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.categoryService.deleteCategory(categoryId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  
  
}  