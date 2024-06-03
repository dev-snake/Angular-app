import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../../../shared/service/data/data.service';
import { Feedback } from '../../../../../shared/interfaces/feedback';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  @Output() public feedback = new EventEmitter<string>();
  public feedbackForm: FormGroup;
  public levelValue: number = 0;
  public satisfactionLevels = this.dataService.satisfactionLevels;
  constructor(private dataService: DataService) {
    this.feedbackForm = new FormGroup({
      levelOfSatisfaction: new FormControl('', [Validators.required]),
      feedback: new FormControl('', [Validators.required]),
    });
  }
  submitFeedback() {
    if (this.feedbackForm.invalid) {
      return;
    }
    this.feedback.emit(this.feedbackForm.value);
  }
  setSatisfactionLevel(level: number, icon: string) {
    this.levelValue = level;
    this.feedbackForm.controls['levelOfSatisfaction'].setValue(level);
  }
}
