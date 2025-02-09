import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateNoteComponent } from './components/notes/create-note/create-note.component';
import { EditNoteComponent } from './components/notes/edit-note/edit-note.component';
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    EditNoteComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
