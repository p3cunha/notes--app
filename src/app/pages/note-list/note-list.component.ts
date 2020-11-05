import { style, trigger, transition, animate, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [
    trigger('itemAnim', [ //selector used by template
      //ENTRY ANIMATION
      transition('void => *', [ //ANIMATION SURGERY - NON EXISTING => ANY STATE 
        //INITIAL STATE
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0)',
          'margin-bottom': 0,

          //INITIAL STATE BEFORE EXPAND PADDING PROPERTIES
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        // FIRST ANIMATE THE SPACING (INCLUDES HEIGHT AND MARGIN)
        animate('100ms', style({
          height: '*', //means the height of the DOM element
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        //ANIMATE THE FINAL STATE
        animate(150)
      ]),

      // CLOSING ANIMATION
      transition('* => void', [ // animation disappearing, any state => void
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then back to normal size & beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75,
        })),
        // scale down & fade out completely
        animate('120ms',style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        //THEN ANIMATE THE SPACING (HEIGHT, MARGIN, PADDING)
        animate('150ms', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])
    ]),

    //Avoid simultaneous animation of all list components, trigger one note by one
    //Cited on entire list div
    trigger('listAnim', [
      transition('* => *', [ // state => state
        query(':enter', [ //when element is entering, do this things...
        //initial style of entering element
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [  // delay/gap between each queried item animation
            animate('0.3s ease')
          ])
    ], { optional: true } 
    )
      ])
    ])
  ]
})

export class NoteListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //PUT EXISTENT notes FROM SERVICE IN this.notes TO DISPLAY ONE BY ONE IN *ngFor
    this.notes = this.notesService.getAll() 
  }

  //receive event emitted from X-button in child component and call function below
  receiveDeleteEventFromXButton(id: number){
    this.notesService.delete(id)
  }

}
