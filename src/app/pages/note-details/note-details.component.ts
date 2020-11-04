import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/shared/notes.service';

import { Note } from '../../shared/note.module';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note

  constructor(private notesService: NotesService,
              private router: Router) { }

  ngOnInit(): void {
    this.note = new Note(); //instantiate note to init correctly 
  }

  onSubmit(form: NgForm){ //instance parameter as a form
    console.log(form);
    this.notesService.add(form.value);
    this.router.navigateByUrl('/'); //navigate to anterior page 

  }

  cancel(){
    this.router.navigateByUrl('/')
  }
}
