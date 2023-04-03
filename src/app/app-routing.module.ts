import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./game/board/board.component";

const routes: Routes = [
	{ path: "", component: BoardComponent },
	// {path: 'high-scores', component: }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
