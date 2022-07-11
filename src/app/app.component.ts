import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  // @ViewChild('quoteDisplay')
  // quoteDisplayElement!: ElementRef;
  // @ViewChild('quoteInput')
  // quoteInputElement!: ElementRef;
  quoteDisplayElement: any;
  quoteInputElement: any;
  constructor(private randomApi: RandomQuoteApiService) {}
  ngAfterViewInit() {
    this.quoteDisplayElement = document.getElementById('quoteDisplay');
    this.quoteInputElement = document.getElementById('quoteInput');
  }
  ngOnInit(): void {
    this.getQuote();
  }
  getQuote() {
    this.randomApi.getRandomQuote().subscribe((data: Quote) => {
      this.quoteDisplayElement.innerHTML = '';
      this.quote = data.content;
      this.quote.split('').forEach((character: string) => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        this.quoteDisplayElement.appendChild(characterSpan);
      });
      this.quoteInputElement.value = null;
      
    });
  }
  checkLetter(event: any) {
    const arrayQuote = this.quoteDisplayElement.querySelectorAll('span');
    const arrayValue = this.quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan: any, index: any) => {
      const character = arrayValue[index];
      if (character == null) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        correct = false;
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      } else {
        characterSpan.classList.remove('correct');
        characterSpan.classList.add('incorrect');
        correct = false;
      }
    });
    if (correct) this.getQuote();
  }
}
