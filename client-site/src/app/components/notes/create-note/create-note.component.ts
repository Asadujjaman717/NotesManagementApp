import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {
  sessionId: string | null = localStorage.getItem('sessionId');
  userId: string | null = localStorage.getItem('userId');
  

  note = {
    noteId: '',
    type: '',
    content: '',
    reminderDate: '',
    dueDate: '',
    isCompleted: false,
    bookmarkUrl: ''
  };

  constructor(private notesService: NotesService, public router: Router) {}

  createNote() {
    console.log(this.sessionId);
    console.log(this.userId);
    if (this.sessionId == null ) {
      alert('User not logged in. Please log in first.');
      return;
    }

    const noteData = {
      noteId: this.note.noteId || '',
      userId: this.userId || '',
      type: this.note.type,
      content: this.note.content,
      reminderDate: this.note.reminderDate || '',
      dueDate: this.note.dueDate || '',
      isCompleted: this.note.isCompleted,
      bookmarkUrl: this.note.bookmarkUrl || ''
    };
    console.log(noteData);

    this.notesService.createNote(noteData, this.sessionId).subscribe(
      () => {
        alert('Note created successfully!');
        this.router.navigate(['/dashboard']);
      },
      (error) => console.error('Error creating note:', error)
    );
  }
}
