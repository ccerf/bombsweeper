import { Component, OnInit } from '@angular/core';
import { Cell } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public cells: Cell[][] = [];

  private rowsCount = 10;
  private columnsCount = 10;
  private bombsCount = 10;

  ngOnInit(): void {
    this.createBoard();
  }

  private createBoard(): void {
    for(let y = 0; y < this.columnsCount; y++) {
      this.cells[y] = []
      for (let x=0; x < this.rowsCount; x ++) {
        this.cells[y].push(this.getNewCell())
      }
    }
    this.assignBombs();
  }

  private getNewCell(): Cell {
    return {
      status: 'open',
      bomb: false,
      proximityMines: 0
    }
  }

  private assignBombs(): void {
      let assignedBombs = this.getBombCount();
      while(assignedBombs < this.bombsCount) {
          this.getRandomCell().bomb = true;
          assignedBombs = this.getBombCount();
      }
      console.log(this.cells)
  }

  private getRandomCell(): Cell {
    const y = Math.floor(Math.random() * this.columnsCount);
    const x = Math.floor(Math.random() * this.rowsCount )
    return this.cells[x][y];
  }

  private getBombCount(): number {
    let count = 0;
    for(let y = 0; y < this.columnsCount; y++) {
      for (let x=0; x < this.rowsCount; x ++) {
        if(this.cells[y][x].bomb) {
          count++;
        }
      }
    }
    console.log(count)
    return count;
  }
 
}
