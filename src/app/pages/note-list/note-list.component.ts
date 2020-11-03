import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  cardTitle = 'title'
  cardBody = 'body'

  constructor() { }

  ngOnInit(): void {
  }

}
