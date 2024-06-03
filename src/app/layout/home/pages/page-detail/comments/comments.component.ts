import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Products } from '../../../../../shared/interfaces/product';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnChanges {
  @Output() comment = new EventEmitter<string>();
  @Input() commentList: any[] = [];
  @Input() isLogged: boolean = false;
  @Input() product: Products[] | undefined = [];
  public formComment: FormGroup;
  public displayedComments: any[] = [];
  public pageSize: number = 3;
  public currentPage: number = 1;

  constructor(private authService: AuthService) {
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
    const time = day.getHours();
    const minute = day.getMinutes();
    const second = day.getSeconds();
    const fullTime = `${date}/${month}/${year} ${time}:${minute}:${second}`;
    this.formComment = new FormGroup({
      username_customer: new FormControl(this.authService.getUsername()),
      content: new FormControl('', [Validators.required]),
      date: new FormControl(fullTime),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['commentList']) {
      this.loadComments();
    }
  }

  addComment() {
    this.comment.emit(this.formComment.value.content);
  }

  loadComments() {
    const endIndex = this.currentPage * this.pageSize;
    this.displayedComments = this.commentList.slice(0, endIndex);
  }

  showMoreComments() {
    this.currentPage++;
    this.loadComments();
  }
}
