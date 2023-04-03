import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./game/board/board.component";
import { ScoresTableComponent } from "./game/scores-table/scores-table.component";

const routes: Routes = [
	{ path: "", component: BoardComponent },
	{ path: "high-scores", component: ScoresTableComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
