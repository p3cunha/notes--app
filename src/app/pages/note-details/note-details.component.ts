import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from '../../shared/note.module';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note

  constructor() { }

  ngOnInit(): void {
    this.note = new Note(); //instantiate note to init correctly
  }

  onSubmit(form: NgForm){
    console.log(form)
  }
}
