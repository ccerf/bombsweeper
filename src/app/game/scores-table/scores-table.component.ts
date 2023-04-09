import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DocumentData, Firestore, collection, collectionData, orderBy, query, where } from "@angular/fire/firestore";
import { Score } from "../models";

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: "app-scores-table",
	templateUrl: "./scores-table.component.html",
	styleUrls: ["./scores-table.component.scss"],
})
export class ScoresTableComponent implements OnInit {
	public easyScores: Score[] = [];
	public mediumScores: Score[] = [];
	public hardScores: Score[] = [];

	constructor(private firestore: Firestore) {}

	ngOnInit(): void {
		this.getScores();
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
}
