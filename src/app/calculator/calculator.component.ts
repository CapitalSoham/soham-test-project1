import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public scr_input: any = '';
  public length:any = 0;
  constructor() { }

  ngOnInit(): void {
  }
  display(val: any) {
    this.scr_input = this.scr_input + val;
  }
  clearScreen() {
    this.scr_input = '';
  }
  calculate() {
    if (this.scr_input) {
    this.scr_input = String(eval(this.scr_input));
    }
  }
  // @HostListener('document:keypress', ['$event'])
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '1':
    this.scr_input = this.scr_input + event.key;

        break;
      case '2':
    this.scr_input = this.scr_input + event.key;

        break;
      case '3':
    this.scr_input = this.scr_input + event.key;

        break;
      case '4':
    this.scr_input = this.scr_input + event.key;

        break;
      case '5':
    this.scr_input = this.scr_input + event.key;

        break;
      case '6':
    this.scr_input = this.scr_input + event.key;

        break;
      case '7':
    this.scr_input = this.scr_input + event.key;

        break;
      case '8':
    this.scr_input = this.scr_input + event.key;

        break;
      case '9':
    this.scr_input = this.scr_input + event.key;

        break;
      case '0':
    this.scr_input = this.scr_input + event.key;

        break;
      case '+':
    this.scr_input = this.scr_input + event.key;

        break;
      case '-':
    this.scr_input = this.scr_input + event.key;

        break;
      case '*':
    this.scr_input = this.scr_input + event.key;

        break;
      case '/':
    this.scr_input = this.scr_input + event.key;

        break;
      case 'Backspace':
        console.log(this.scr_input);
        
      this.length = this.scr_input.length != 0?this.scr_input.length:0;
      this.scr_input = this.scr_input.slice(0,--this.length);
        break;

      case 'Delete':

        break;
      case 'Enter':
        if (this.scr_input) {
          this.calculate();
        }
        break;
      case 'e':
        this.scr_input = this.scr_input + event.key;

        break;
      default:
        break;
    }
  }
}
