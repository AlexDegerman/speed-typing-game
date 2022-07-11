import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RandomQuoteApiService {
  apiUrl  = 'https://api.quotable.io/random'

  constructor(private http: HttpClient) { }

  getRandomQuote() {
    return this.http.get(this.apiUrl)
  }
}
