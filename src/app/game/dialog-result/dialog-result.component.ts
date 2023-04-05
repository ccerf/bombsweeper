import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ScoreFormComponent } from "../score-form/score-form.component";

@Component({
	standalone: true,
	imports: [CommonModule, ScoreFormComponent],
	selector: "app-dialog-result",
	templateUrl: "./dialog-result.component.html",
	styleUrls: ["./dialog-result.component.scss"],
})
export class DialogResultComponent {
	@Input() win = false;
	@Input() level = "easy";
	@Input() lose = false;
	@Input() rank = 0;
	@Input() timer: string;
	@Output() resetEvent = new EventEmitter<boolean>();

	public emitReset(): void {
		this.resetEvent.emit(true);
	}
}
