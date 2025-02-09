import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  regularNotes: any[] = [];
  reminderNotes: any[] = [];
  todoNotes: any[] = [];
  bookmarkNotes: any[] = [];
  isLoggedIn: boolean = false;
  sessionId: string | null = null;
  userId: string | null = null;
  userEmail: string = '';
  noteId: string = '';

  constructor(private notesService: NotesService, 
      public router: Router,
      private authService: AuthService,
      private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.sessionId);
    console.log(this.userId);
    this.checkLoginStatus();
    this.route.queryParams.subscribe((params: any) => {
      this.userEmail = params['email'];
    });
    if (this.isLoggedIn) {
      this.fetchNotes();
    }
  }

  checkLoginStatus(): void {
    this.sessionId = localStorage.getItem('sessionId');
    if (this.sessionId) {
      this.userId = localStorage.getItem('userId');
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  fetchNotes(): void {
    if (this.sessionId) {
      this.notesService.getNotes(this.sessionId).subscribe(data => {
        this.regularNotes = data.filter(note => note.type === 'regular');
        this.reminderNotes = data.filter(note => note.type === 'reminder');
        this.todoNotes = data.filter(note => note.type === 'todo');
        this.bookmarkNotes = data.filter(note => note.type === 'bookmark');
      });
    }
  }

  editNote(note: any): void {
    console.log('Editing note:', note);
    this.noteId = note.noteId;
    console.log('Navigating to edit-note() dashboard.ts with noteId:', this.noteId);
    this.router.navigate(['/edit-note', this.noteId]);

  }

  deleteNote(id: string): void {
    if (!this.sessionId) return;

  const confirmDelete = confirm('Are you sure you want to delete this note?');
  if (!confirmDelete) return;

  console.log('Deleting note:', id);
    this.notesService.deleteNote(id, this.sessionId).subscribe(() => {
      this.fetchNotes();  // Refresh notes after deletion
    }, (error) => {
      console.error('Error deleting note:', error);
      alert('Failed to delete note.');
    });
  }

  logout(){
    console.log('Logging out');
    if(!this.sessionId) {
      console.log('No session found');
      return;}
    this.authService.logout(this.sessionId).subscribe(() => {
      this.sessionId = null;
      this.router.navigate(['/signup']);
      alert('Logout successful');
    });
  }
}
