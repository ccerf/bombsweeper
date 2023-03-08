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
  private neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  private cellsToClear = 0;

  ngOnInit(): void {
    this.cellsToClear = this.rowsCount * this.columnsCount - this.bombsCount;
    this.createBoard();
  }

  public checkCell(cell: Cell): 'gameover' | 'win' | null {
    console.log('hllo')
    if (cell.status !== 'open') {
      return null;
    } else if (cell.bomb) {
      this.clearAll();
      alert('gameover');
      return 'gameover';
    } else {
      cell.status = 'clear';
      this.cellsToClear--;

      if (cell.proximityBombs === 0) {
        for(const neighbor of this.neighbors) {
          if (
            this.cells[cell.column + neighbor[0]] &&
            this.cells[cell.column + neighbor[0]][cell.row + neighbor[1]]
          ) {
            this.checkCell(this.cells[cell.column + neighbor[0]][cell.row + neighbor[1]]);
          }
        }
      }

      if (this.cellsToClear === 0) {
        alert('win');
        return 'win'
      } else {
        return null;
      }
    }
  }

  public flag(cell: Cell, event: MouseEvent): void {
    event.preventDefault();
    if(cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  public reset(): void {
    this.createBoard();
  }

  private createBoard(): void {
    for(let y = 0; y < this.columnsCount; y++) {
      this.cells[y] = []
      for (let x=0; x < this.rowsCount; x ++) {
        this.cells[y].push(this.getNewCell(y,x))
      }
    }
    this.assignBombs();
  }

  private getNewCell(y: number, x: number): Cell {
    return {
      status: 'open',
      bomb: false,
      proximityBombs: 0,
      column: y,
      row: x
    }
  }

  private assignBombs(): void {
      let assignedBombs = this.getBombCount();
      while(assignedBombs < this.bombsCount) {
          this.getRandomCell().bomb = true;
          assignedBombs = this.getBombCount();
      }
      this.getProximityBombs();
  }

  private clearAll(): void {
    this.cells.forEach((row)=>{
      row.forEach((cell)=>{
        cell.status = 'clear'
      })
    })
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
    return count;
  }

  private getProximityBombs(): void {
    for (let y =0; y < this.columnsCount; y++) {
      for (let x =0; x < this.rowsCount; x++) {
        let adjacentBombs = 0;
        for (const neighbor of this.neighbors) {
          if (
            this.cells[y + neighbor[0]] &&
            this.cells[y + neighbor[0]][x + neighbor[1]] &&
            this.cells[y + neighbor[0]][x + neighbor[1]].bomb
          ) {
            adjacentBombs++;
          }
          this.cells[y][x].proximityBombs = adjacentBombs;
        }
      }
    }
  }
 
}
