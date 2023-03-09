import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-infobar',
  imports: [CommonModule],
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent {
  public flagCount = 0;
  public timer = 0;
  public displayedTimer = '000';

  private gameStarted = false;
  private interval: any;

  public startTimer(): void {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.interval = setInterval(()=>{
        this.timer++;
        if (this.timer < 10) {
          this.displayedTimer = '00'+this.timer.toString();
        } else if (this.timer < 100) {
          this.displayedTimer = '0'+this.timer.toString();
        } else {
          this.displayedTimer = this.timer.toString();
        }
        console.log('hello')
      },1000)
    }
  }

  public resetTimer(): void {
    this.stopTimer();
    this.timer = 0;
    this.displayedTimer = '000';
    this.gameStarted = false;
  }

  public stopTimer(): void {
    clearInterval(this.interval)
  }
}
