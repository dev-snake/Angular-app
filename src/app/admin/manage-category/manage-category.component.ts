import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService as CRUD_SERVICE_PRODUCT } from '../service/crud-product/crud.service';
import { CrudService as CRUD_SERVICE_CATEGORY } from '../service/crud-category/crud.service';
import { Category } from '../../shared/interfaces/category';
import { Products } from '../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css',
})
export class ManageCategoryComponent implements OnInit {
  @ViewChild('categoryForm') categoryForm: ElementRef | undefined;
  @ViewChild('editCategoryForm') editCategoryForm: ElementRef | undefined;
  dataCategories: Category[] | undefined;
  formAddCategory: FormGroup;
  currentCategoryId: number | null = null;
  formEditCategory: FormGroup;

  constructor(
    private CRUD_PRODUCT: CRUD_SERVICE_PRODUCT,
    private CRUD_CATEGORY: CRUD_SERVICE_CATEGORY
  ) {
    this.formAddCategory = new FormGroup({
      category_name: new FormControl('', [Validators.required]),
    });
    this.formEditCategory = new FormGroup({
      category_name: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.CRUD_CATEGORY.getCategories().subscribe((categories: Category[]) => {
      this.dataCategories = categories;
    });
  }

  addToastCategory() {
    this.categoryForm?.nativeElement.classList.toggle('hidden');
    this.editCategoryForm?.nativeElement.classList.add('hidden');
  }
  addCategory() {
    this.CRUD_CATEGORY.addCategory(this.formAddCategory.value).subscribe(
      (category: Category) => {
        this.getCategories();
        this.categoryForm?.nativeElement.classList.toggle('hidden');
        this.formAddCategory.reset();
      }
    );
  }
  editCategory(category_id: number) {
    this.currentCategoryId = category_id;
    this.editCategoryForm?.nativeElement.classList.toggle('hidden');
    this.categoryForm?.nativeElement.classList.add('hidden');
    this.CRUD_CATEGORY.getCategories().subscribe((categories: Category[]) => {
      const category = categories.find((category: Category) => {
        return category.category_id === category_id;
      });
      this.formEditCategory.setValue({
        category_name: category?.category_name,
      });
    });
  }
  editCategorySubmit() {
    this.CRUD_CATEGORY.updateCategory(
      this.currentCategoryId!,
      this.formEditCategory.value
    ).subscribe((category: Category) => {
      this.currentCategoryId = null;
      this.getCategories();
      this.editCategoryForm?.nativeElement.classList.toggle('hidden');
      this.formEditCategory.reset();
    });
  }
  deleteCategory(category_id: number) {
    const confirmDelete: boolean = confirm('Bạn có chắc muốn xóa không ?');
    if (confirmDelete) {
      this.CRUD_PRODUCT.getProducts().subscribe((products: Products[]) => {
        const checkEmpty = products.filter((product: Products) => {
          return product.category === category_id;
        });
        if (checkEmpty.length > 0) {
          const messageDiv = document.createElement('div');
          messageDiv.textContent = 'Không thể xóa danh mục này';
          messageDiv.style.position = 'fixed';
          messageDiv.style.top = '5rem';
          messageDiv.style.right = '4rem';
          messageDiv.style.backgroundColor = '#ff0000';
          messageDiv.style.color = 'white';
          messageDiv.style.padding = '10px';
          messageDiv.style.borderRadius = '1rem';
          messageDiv.style.transition = 'all 0.5s ease-in-out';
          messageDiv.style.fontWeight = '500';
          messageDiv.style.fontFamily = 'Quicksand, sans-serif';
          document.body.appendChild(messageDiv);
          setTimeout(() => {
            messageDiv.remove();
          }, 1000);
          return;
        } else {
          this.CRUD_CATEGORY.deleteCategory(category_id).subscribe(
            (category: Category) => {
              this.getCategories();
            }
          );
        }
      });
      return;
    }
  }
}
