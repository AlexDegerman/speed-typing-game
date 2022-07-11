import { Component, ElementRef, ViewChild } from '@angular/core';
import { RandomQuoteApiService } from './random-quote-api.service';
import { Quote } from './quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'speed-type-game';
  quote: any;
  @ViewChild('quoteDisplay')
  quoteDisplayElement!: ElementRef;
  @ViewChild('quoteInput')
  quoteInputElement!: ElementRef;

  constructor(private randomApi: RandomQuoteApiService) {}
  ngOnInit(): void {
    this.getQuote()
  }
  getQuote() {
    this.randomApi.getRandomQuote().subscribe((data: Quote) => {
      this.quoteDisplayElement.nativeElement.innerHTML = data.content
    })
  }
}
