import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'https://localhost:7249/api/notes/';

  constructor(private http: HttpClient) {}

  // Fetch all notes
  getNotes(sessionId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('sessionId', sessionId);
    return this.http.get<any[]>(`${this.apiUrl}get-notes`, { headers });
  }

  // Create a new note
  createNote(note: any, sessionId: string): Observable<any> {
    console.log("note.service.ts hit for createNote");
    const headers = new HttpHeaders().set('sessionId', sessionId);
    return this.http.post<any>(`${this.apiUrl}create-note`, note, { headers });
  }

  getNoteById(noteId: string, sessionId: string): Observable<any> {
    const headers = new HttpHeaders({ 'sessionId': sessionId });
    return this.http.get<any>(`${this.apiUrl}get-notes/${noteId}`, { headers });
  }

  // Update an existing note
  updateNote(noteId: string, sessionId: string, noteData: any): Observable<any> {
    console.log("note.service.ts hit for updateNote()");
    console.log(noteId + " " + sessionId + " " + noteData);
    const headers = new HttpHeaders({ 'sessionId': sessionId });
    return this.http.put<any>(`${this.apiUrl}update-note/${noteId}`, noteData, { headers });
  }

  // Delete a note by noteId
  deleteNote(id: string, sessionId: string): Observable<any> {
    console.log("note.service.ts hit for deleteNote");
    console.log(id + " from note.service.ts");
    const headers = new HttpHeaders().set('sessionId', sessionId);
    return this.http.delete<any>(`${this.apiUrl}delete-note/${id}`, { headers });
  }
}
