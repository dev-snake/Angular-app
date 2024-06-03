import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/api.service';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../shared/interfaces/feedback';
import { User } from '../../shared/interfaces/user';
import { AuthService as API_USER } from '../../shared/service/auth/auth.service';
import { Products } from '../../shared/interfaces/product';
@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
})
export class FeedbacksComponent implements OnInit {
  public user: User | undefined;
  public feedbacks: Feedback[] = [];
  public product: Products | undefined;
  constructor(private apiService: ApiService, private API_USER: API_USER) {}
  ngOnInit(): void {
    this.apiService.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      this.feedbacks = feedbacks;
      feedbacks.forEach((feedback: Feedback) => {
        this.API_USER.getUsers().subscribe((users: User[]) => {
          this.user = users.find((user: User) => user._id === feedback.userId);
        });
        this.apiService
          .getProducts()
          .subscribe(
            (product: Products[]) =>
              (this.product = product.find(
                (product: Products) => product._id === feedback.productId
              ))
          );
      });
    });
  }
}
