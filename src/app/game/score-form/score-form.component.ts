import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Firestore, collection, addDoc } from "@angular/fire/firestore";
import { LoaderComponent } from "../loader/loader.component";

@Component({
	standalone: true,
	selector: "app-score-form",
	imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
	templateUrl: "./score-form.component.html",
	styleUrls: ["./score-form.component.scss"],
})
export class ScoreFormComponent implements OnInit {
	@Input() timer: string = "00";
	@Input() level: string = "easy";
	@Output() newGame = new EventEmitter();

	public form: FormGroup;
	public loading = false;

	constructor(private formBuilder: FormBuilder, private firestore: Firestore) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			pseudo: "",
			timer: this.timer,
			level: this.level,
		});
	}

	emitReset(): void {
		this.newGame.emit();
	}

	onSubmit(form: any) {
		this.loading = true;
		const collectionInstance = collection(this.firestore, "scores");
		addDoc(collectionInstance, form.value)
			.then(() => {
				this.loading = false;
				this.emitReset();
			})
			.catch((error) => {
				this.loading = false;
				console.log(error);
			});
	}
}
