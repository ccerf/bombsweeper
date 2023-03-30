import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  selector: 'app-infobar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent {
  @Output() levelChanged = new EventEmitter();
  public faFlag= faFlag;
  public flagCount = 10;
  public timer = 0;
  public displayedTimer = '000';
  public  levels = [{label: 'Easy', value : 1},{label: 'Medium', value : 2},{label: 'Hard', value : 3}];

  private currentLevel = 1;
  private gameStarted = false;
  private interval: any;

  public changeLevel(event: Event): void {
    this.currentLevel = +(event.target as HTMLSelectElement).value;
    this.levelChanged.emit(this.currentLevel);
  }

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
