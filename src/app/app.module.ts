import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardComponent } from "./game/board/board.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";
import { environment } from "src/environments/environment";
import { ScoreFormComponent } from "./game/score-form/score-form.component";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BoardComponent,
		ScoreFormComponent,
		FontAwesomeModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
