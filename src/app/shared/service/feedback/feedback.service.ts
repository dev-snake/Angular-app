import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../../interfaces/feedback';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}
  public addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(
      'http://localhost:3000/feedbacks',
      feedback
    );
  }
}
