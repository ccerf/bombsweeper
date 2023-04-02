import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
	standalone: true,
	selector: "app-score-form",
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./score-form.component.html",
	styleUrls: ["./score-form.component.scss"],
})
export class ScoreFormComponent implements OnInit {
	@Input() timer: string = "";
	@Input() level: string = "easy";
	public form: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			pseudo: "",
			timer: this.timer,
			level: this.level,
		});
	}

	onSubmit(form: any) {
		console.log(form);
	}
}
