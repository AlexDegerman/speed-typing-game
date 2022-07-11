import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class RandomQuoteApiService {
  easyApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100' // 20sec
  mediumApiUrl = 'https://api.quotable.io/random?minLength=150&maxLength=180' // 30sec
  hardApiUrl = 'https://api.quotable.io/random?minLength=240&maxLength=280' // 40sec

  constructor(private http: HttpClient) { }
  getRandomQuote(difficulty: any) {
    if (difficulty === 'easy') { 
    return this.http.get<Quote>(this.easyApiUrl)
  } else if (difficulty === 'medium') {
    return this.http.get<Quote>(this.mediumApiUrl)
  } else {
    return this.http.get<Quote>(this.hardApiUrl)
  }
  }

}
