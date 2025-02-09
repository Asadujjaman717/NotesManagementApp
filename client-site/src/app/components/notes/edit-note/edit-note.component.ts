import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent implements OnInit {
  noteId: string = '';
  sessionId: string | null = localStorage.getItem('sessionId');
  note = {
    content: '',
    type: '',
    reminderDate: '',
    dueDate: '',
    isCompleted: false,
    bookmarkUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    public router: Router
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('noteId') || '';
    console.log("NoteId: " + this.noteId + " on ngOnInit() in edit-note.component.ts");
    if (this.noteId && this.sessionId) {
      this.fetchNote();
    }
  }

  fetchNote() {
    this.notesService.getNoteById(this.noteId, this.sessionId!).subscribe(
      (data) => this.note = data,
      (error) => console.error('Error fetching note:', error)
    );
  }

  updateNote() {
    console.log("edit-note.component.ts hit for updateNote()");
    if (!this.sessionId) {
      alert('Session expired, please log in again.');
      return;
    }
    console.log(this.noteId + ' ' + this.sessionId + ' ' + this.note);
    this.notesService.updateNote(this.noteId, this.sessionId, this.note).subscribe(
      () => {
        alert('Note updated successfully!');
        this.router.navigate(['/dashboard']);
      },
      (error) => console.error('Error updating note:', error)
    );
  }
}
