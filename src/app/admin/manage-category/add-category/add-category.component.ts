import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  @Output() addCategoryButton = new EventEmitter();
  public formAddCategory: FormGroup;
  constructor() {
    this.formAddCategory = new FormGroup({
      category_name: new FormControl('', [Validators.required]),
    });
  }
  public addCategory(): void {
    this.addCategoryButton.emit(this.formAddCategory);
  }
}
