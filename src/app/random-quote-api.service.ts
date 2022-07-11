import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class RandomQuoteApiService {
  apiUrl  = 'https://api.quotable.io/random'

  constructor(private http: HttpClient) { }

  getRandomQuote() {
    return this.http.get<Quote>(this.apiUrl)
  }
}
