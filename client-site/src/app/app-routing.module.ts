import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateNoteComponent } from './components/notes/create-note/create-note.component';
import { EditNoteComponent } from './components/notes/edit-note/edit-note.component';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'create-note', component: CreateNoteComponent},
  { path: 'edit-note/:noteId', component: EditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
