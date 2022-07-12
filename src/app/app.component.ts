import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RandomQuoteApiService } from './random-quote-api.service';
import { Quote } from './quote';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'speed-typing-game';
  quote: any;
  @ViewChild('quoteDisplay')
  quoteDisplayElement!: ElementRef;
  @ViewChild('quoteInput')
  quoteInputElement!: ElementRef;
  @ViewChild('basicTimer')
  timerElement: any;
  startTime = 20;
  selectedDifficulty = 'easy';

  constructor(private randomApi: RandomQuoteApiService) {}

  ngAfterViewInit() {
    // Disable timer at start
    this.timerElement.stop();
  }

  ngOnInit(): void {}

  //Get a random quote from the api server using the current difficulty level selected
  getQuote() {
    this.timerElement.start();
    this.randomApi
      .getRandomQuote(this.selectedDifficulty)
      .subscribe((data: Quote) => {
        this.quoteDisplayElement.nativeElement.innerText = '';
        this.quote = data.content;
        this.quote.split('').forEach((character: string) => {
          const characterSpan = document.createElement('span');
          characterSpan.innerText = character;
          this.quoteDisplayElement.nativeElement.appendChild(characterSpan);
        });
        this.quoteInputElement.nativeElement.value = null;
      });
  }
  //Function that runs on every key input checking if the character input was correct or incorrect
  checkCharacter(event: any) {
    const arrayQuote =
      this.quoteDisplayElement.nativeElement.querySelectorAll('span');
    const arrayValue = this.quoteInputElement.nativeElement.value.split('');
    let correct = false;
    arrayQuote.forEach((characterSpan: any, index: any) => {
      const character = arrayValue[index];
      if (character == null) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        correct = false;
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
        correct = true;
      } else {
        characterSpan.classList.remove('correct');
        characterSpan.classList.add('incorrect');
        correct = false;
      }
    });
    if (correct) {
      alert('You win! Getting new quote!');
      this.getQuote();
    }
    if (this.timerElement.get().seconds === 0) {
      alert('You lost! Restarting!');
      window.location.reload();
    }
  }
  // This function the start button calls to start the game and focus on the input box
  startGame() {
    this.quoteInputElement.nativeElement.focus();
    this.getQuote();
  }
  // The difficulty selector calls this function to prepare the timer
  changeTimer() {
    if (this.selectedDifficulty === 'easy') {
      this.startTime = 20;
    } else if (this.selectedDifficulty === 'medium') {
      this.startTime = 30;
    } else {
      this.startTime = 40;
    }
  }
}
