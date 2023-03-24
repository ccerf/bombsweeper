import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './game/board/board.component';
import { DialogResultComponent } from './game/dialog-result/dialog-result.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BoardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
