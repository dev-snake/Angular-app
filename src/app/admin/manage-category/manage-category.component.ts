import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService as CRUD_SERVICE_PRODUCT } from '../service/crud-product/crud.service';
import { CrudService as CRUD_SERVICE_CATEGORY } from '../service/crud-category/crud.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { Category } from '../../shared/interfaces/category';
import { Products } from '../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../shared/service/toast/toast.service';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddCategoryComponent],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css',
})
export class ManageCategoryComponent implements OnInit {
  @ViewChild('categoryForm') categoryForm: ElementRef | undefined;
  @ViewChild('editCategoryForm') editCategoryForm: ElementRef | undefined;
  dataCategories: Category[] | undefined;
  currentCategoryId: number | null = null;
  formEditCategory: FormGroup;

  constructor(
    private CRUD_PRODUCT: CRUD_SERVICE_PRODUCT,
    private CRUD_CATEGORY: CRUD_SERVICE_CATEGORY,
    private toastService: ToastService
  ) {
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
  addCategory(data: FormGroup) {
    this.CRUD_CATEGORY.addCategory(data.value).subscribe(
      (category: Category) => {
        this.getCategories();
        this.categoryForm?.nativeElement.classList.toggle('hidden');
        data.reset();
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
          this.toastService.showToast('Không thể xóa danh mục này', 'error');
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
