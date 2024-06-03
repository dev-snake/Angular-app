import { Component, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent {
  @Output() EditFormSubmit = new EventEmitter();
  public formEditCategory: FormGroup;
  constructor() {
    this.formEditCategory = new FormGroup({
      category_name: new FormControl('', [Validators.required]),
    });
  }
  public editCategorySubmit(): void {
    this.EditFormSubmit.emit(this.formEditCategory);
  }
}
