import { Injectable } from '@angular/core';

import { Note } from './note.module';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor() { }

  get(id: number){
    return this.notes[id]
  }

  getId(note: Note){
    return this.notes.indexOf(note)
  }

  add(note: Note){
    let noteLength = this.notes.push(note) // push note into var
    let index = noteLength -1 // id - index
    return index
  }

  update(id: number, title: string, body: string){
    let note = this.notes[id]
    note.title = title;
    note.body = body
  }

  delete(id: number){
    this.notes.splice(id, 1)
  }

}
