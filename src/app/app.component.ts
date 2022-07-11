import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RandomQuoteApiService } from './random-quote-api.service';
import { Quote } from './quote';
import { CdTimerComponent } from 'angular-cd-timer';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

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
  @ViewChild('basicTimer')
  timerElement: any
  startTime = 20;
  selectedDifficulty = 'easy';
  constructor(private randomApi: RandomQuoteApiService) {}
  ngAfterViewInit() {
    this.timerElement.stop();
    
  }
  ngOnInit(): void {
    
  }
  getQuote() {
    this.timerElement.start();
    
    this.randomApi.getRandomQuote(this.selectedDifficulty).subscribe((data: Quote) => {
      this.quoteDisplayElement.nativeElement.innerText=""
      this.quote = data.content;
      this.quote.split('').forEach((character: string) => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        this.quoteDisplayElement.nativeElement.appendChild(characterSpan);
      });
      this.quoteInputElement.nativeElement.value = null;
    });
    
  }
  checkLetter(event: any) {
    const arrayQuote = this.quoteDisplayElement.nativeElement.querySelectorAll('span');
    const arrayValue = this.quoteInputElement.nativeElement.value.split('');
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
    if (correct) {
      alert('You win! Getting new quote!')
      this.getQuote();
    }
    if (this.timerElement.get().seconds === 0) {
      alert('You lost! Restarting!')
      window.location.reload();
    }
  
  }
  startGame() {
    this.getQuote();
  }
  focusOnInput() {
    this.quoteInputElement.nativeElement.focus();
  }
  changeTimer() {
    if (this.selectedDifficulty === 'easy') {
      this.startTime = 20;
    } else if (this.selectedDifficulty === 'medium'){
      this.startTime = 30;
    } else {
      this.startTime = 40;
    }
  }

  
}
