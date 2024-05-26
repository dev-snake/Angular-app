import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService as CRUD_SERVICE_PRODUCT } from '../service/crud-product/crud.service';
import { CrudService as CRUD_SERVICE_CATEGORY } from '../service/crud-category/crud.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-CRUD_PRODUCT-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  @ViewChild('form_add') form_add!: ElementRef;
  @ViewChild('form_edit') form_edit!: ElementRef;
  products: any[] = [];
  categories: any;
  productForm: FormGroup;
  productFormUpdate: FormGroup;
  currentProductId: number | null = null;

  constructor(
    private CRUD_PRODUCT: CRUD_SERVICE_PRODUCT,
    private CRUD_CATEGORY: CRUD_SERVICE_CATEGORY
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      image: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      title_description_1: new FormControl('', [Validators.required]),
      title_description_2: new FormControl('', [Validators.required]),
    });

    this.productFormUpdate = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      title_description_1: new FormControl('', [Validators.required]),
      title_description_2: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.CRUD_PRODUCT.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  getCategories() {
    this.CRUD_CATEGORY.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  editProduct(id: number) {
    this.currentProductId = id;

    const product = this.products.find((p) => p._id === id);
    if (product) {
      this.productFormUpdate.patchValue(product);
      this.form_edit.nativeElement.classList.remove('hidden');
      this.form_add.nativeElement.classList.add('hidden');
    }
  }

  updateProduct() {
    if (this.productFormUpdate.valid && this.currentProductId) {
      this.CRUD_PRODUCT.updateProduct(
        this.currentProductId,
        this.productFormUpdate.value
      ).subscribe(() => {
        this.getProducts();
        this.form_edit.nativeElement.classList.add('hidden');
        this.currentProductId = null;
      });
    }
  }

  deleteProduct(id: number) {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa sản phẩm này không?'
    );
    if (confirmed) {
      this.CRUD_PRODUCT.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
    }
  }
  showToastAdd() {
    this.form_add.nativeElement.classList.toggle('hidden');
    this.form_edit.nativeElement.classList.add('hidden');
  }
  addProduct() {
    if (this.productForm.valid) {
      this.CRUD_PRODUCT.createProduct(this.productForm.value).subscribe(() => {
        this.getProducts();
        this.productForm.reset();
        this.form_add.nativeElement.classList.add('hidden');
      });
    }
  }
}
