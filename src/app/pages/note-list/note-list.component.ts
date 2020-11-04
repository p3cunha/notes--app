import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //PUT EXISTENT notes FROM SERVICE IN this.notes TO DISPLAY ONE BY ONE IN *ngFor
    this.notes = this.notesService.getAll() 
  }

}
