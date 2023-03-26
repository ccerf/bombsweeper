import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss']
})

export class DialogResultComponent {
  @Input() win = false;
  @Input() lose = false;
  @Input() timer: string;
  @Output() resetEvent = new  EventEmitter<boolean>()


  public emitReset(): void {
    this.resetEvent.emit(true)
  }
}
