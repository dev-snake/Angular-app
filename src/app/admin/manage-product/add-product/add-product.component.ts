import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../shared/interfaces/category';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  @Input() categories: Category[] = [];
  @Output() public formAddSubmit = new EventEmitter();
  public productForm: FormGroup;
  constructor() {
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
      quantityImported: new FormControl('', [Validators.required]),
    });
  }
  public addProduct(): void {
    this.formAddSubmit.emit(this.productForm);
  }
}
