import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NotesService } from 'src/app/shared/notes.service';
import { Note } from '../../shared/note.module';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;
  noteId: number;
  new: boolean;

  constructor(private notesService: NotesService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //CHECK IF WE ARE CREATING A NEW note OR EDITING AN EXISTING ONE
    this.route.params.subscribe((params: Params) => {
      this.note = new Note(); // start form correctly
      if (params.id){ // if have Id
        this.note = this.notesService.get(params.id); //push into note according id
        this.noteId = params.id; //push id into noteId
        this.new = false  //its not a new note
      } else { // if haven't a id 
        this.new = true // its a new note
      }
    })
  }

  onSubmit(form: NgForm){ //instance parameter as a form
    if (this.new) {
    console.log(form);
    this.notesService.add(form.value);
    this.router.navigateByUrl('/'); //navigate to anterior page 
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.router.navigateByUrl('/');
    }
  }

  cancel(){
    this.router.navigateByUrl('/')
  }
}
