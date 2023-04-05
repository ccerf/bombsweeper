import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Cell, Score } from "../models";
import { CommonModule } from "@angular/common";
import { InfobarComponent } from "../infobar/infobar.component";
import { DialogResultComponent } from "../dialog-result/dialog-result.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { DocumentData, Firestore, collection, collectionData, orderBy, query } from "@angular/fire/firestore";

@Component({
	standalone: true,
	selector: "app-board",
	imports: [CommonModule, InfobarComponent, DialogResultComponent, FontAwesomeModule],
	templateUrl: "./board.component.html",
	styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit, AfterViewInit {
	@ViewChild("infobar") infobar: InfobarComponent;

	public faBomb = faBomb;
	public faFlag = faFlag;
	public cells: Cell[][] = [];
	public lose = false;
	public win = false;
	public currentLevel = "easy";
	public rank = 0;

	private rowsCount = 10;
	private columnsCount = 10;
	private bombsCount = 10;
	private neighbors = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	private cellsToClear = 0;

	public easyScores: Score[] = [];
	public mediumScores: Score[] = [];
	public hardScores: Score[] = [];

	constructor(private firestore: Firestore) {}

	ngOnInit(): void {
		this.getScores();
		this.createBoard();
	}

	ngAfterViewInit(): void {
		this.infobar.flagCount = this.bombsCount;
	}

	public checkCell(cell: Cell): "gameover" | "win" | null {
		this.infobar.startTimer();
		if (cell.status !== "open") {
			return null;
		} else if (cell.bomb) {
			this.clearAll();
			this.onLose();
			return "gameover";
		} else {
			cell.status = "clear";
			this.cellsToClear--;

			if (cell.proximityBombs === 0) {
				for (const neighbor of this.neighbors) {
					if (this.cells[cell.column + neighbor[0]] && this.cells[cell.column + neighbor[0]][cell.row + neighbor[1]]) {
						this.checkCell(this.cells[cell.column + neighbor[0]][cell.row + neighbor[1]]);
					}
				}
			}

			if (this.cellsToClear === 0) {
				this.onWin();
				return "win";
			} else {
				return null;
			}
		}
	}

	public flag(cell: Cell, event: MouseEvent): void {
		this.infobar.startTimer();
		event.preventDefault();
		if (cell.status === "flag") {
			cell.status = "open";
			this.infobar.flagCount++;
		} else {
			cell.status = "flag";
			this.infobar.flagCount--;
		}
		if (this.cellsToClear - this.bombsCount === 0) {
			this.onWin();
		}
	}

	public reset(): void {
		this.win = false;
		this.lose = false;
		this.rank = 0;
		this.createBoard();
		this.resetInfobar();
	}

	public onLevelChanged(level: number): void {
		switch (level) {
			case 2:
				this.currentLevel = "medium";
				this.rowsCount = 18;
				this.columnsCount = 14;
				this.bombsCount = 40;
				this.reset();
				break;
			case 3:
				this.currentLevel = "hard";
				this.rowsCount = 24;
				this.columnsCount = 20;
				this.bombsCount = 99;
				this.reset();
				break;
			default:
				this.currentLevel = "easy";
				this.rowsCount = 10;
				this.columnsCount = 10;
				this.bombsCount = 10;
				this.reset();
				break;
		}
	}

	private createBoard(): void {
		this.cells = [];
		this.cellsToClear = this.rowsCount * this.columnsCount - this.bombsCount;
		for (let y = 0; y < this.columnsCount; y++) {
			this.cells[y] = [];
			for (let x = 0; x < this.rowsCount; x++) {
				this.cells[y].push(this.getNewCell(y, x));
			}
		}
		this.assignBombs();
	}

	private getNewCell(y: number, x: number): Cell {
		return {
			status: "open",
			bomb: false,
			proximityBombs: 0,
			column: y,
			row: x,
		};
	}

	private getScores(): void {
		const collectionInstance = collection(this.firestore, "scores");
		const q = query(collectionInstance, orderBy("timer"));
		collectionData(q).subscribe((result: DocumentData[]) => {
			const scores = result as Score[];
			this.easyScores = scores.filter((score) => score.level === "easy");
			this.mediumScores = scores.filter((score) => score.level === "medium");
			this.hardScores = scores.filter((score) => score.level === "hard");
		});
	}

	private assignBombs(): void {
		let assignedBombs = this.getBombCount();
		while (assignedBombs < this.bombsCount) {
			this.getRandomCell().bomb = true;
			assignedBombs = this.getBombCount();
		}
		this.getProximityBombs();
	}

	private clearAll(): void {
		this.cells.forEach((row) => {
			row.forEach((cell) => {
				cell.status = "clear";
			});
		});
	}

	private getRandomCell(): Cell {
		const y = Math.floor(Math.random() * this.columnsCount);
		const x = Math.floor(Math.random() * this.rowsCount);
		return this.cells[y][x];
	}

	private getRank(): void {
		switch (this.currentLevel) {
			case "medium":
				if (
					this.mediumScores.length < 51 &&
					+this.mediumScores[this.mediumScores.length - 1].timer >= +this.infobar.timer
				) {
					this.mediumScores.forEach((score, index) => {
						if (+score.timer >= +this.infobar.timer) {
							if (index < 50 && this.rank === 0) {
								this.rank = index + 1;
								this.win = true;
							}
						}
					});
				} else {
					this.win = true;
					break;
				}
				break;
			case "hard":
				if (this.hardScores.length < 51 && +this.hardScores[this.hardScores.length - 1].timer >= +this.infobar.timer) {
					this.hardScores.forEach((score, index) => {
						if (+score.timer >= +this.infobar.timer) {
							if (index < 50 && this.rank === 0) {
								this.rank = index + 1;
								this.win = true;
							}
						}
					});
				} else {
					this.win = true;
					break;
				}
				break;
			default:
				if (this.easyScores.length < 51 && +this.easyScores[this.easyScores.length - 1].timer >= +this.infobar.timer) {
					this.easyScores.forEach((score, index) => {
						if (+score.timer >= +this.infobar.timer) {
							if (index < 50 && this.rank === 0) {
								this.rank = index + 1;
								this.win = true;
							}
						}
					});
				} else {
					this.win = true;
					break;
				}
				break;
		}
	}

	private getBombCount(): number {
		let count = 0;
		for (let y = 0; y < this.columnsCount; y++) {
			for (let x = 0; x < this.rowsCount; x++) {
				if (this.cells[y][x].bomb) {
					count++;
				}
			}
		}
		return count;
	}

	private getProximityBombs(): void {
		for (let y = 0; y < this.columnsCount; y++) {
			for (let x = 0; x < this.rowsCount; x++) {
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

	private resetInfobar(): void {
		this.infobar.flagCount = this.bombsCount;
		this.infobar.resetTimer();
	}

	private onLose(): void {
		this.infobar.stopTimer();
		this.lose = true;
	}

	private onWin(): void {
		console.log(this);
		this.infobar.stopTimer();
		this.getRank();
	}
}
