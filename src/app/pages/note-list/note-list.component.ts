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
        //THEN ANIMATE THE SPACING (HEIGHT, MARGIN, PADDING) - TOTAL DISAPPEARING 
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
  filteredNotes: Note[] = new Array<Note>(); // created here to be used in template

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //PUT EXISTENT notes FROM SERVICE IN this.notes TO DISPLAY ONE BY ONE IN *ngFor
    this.notes = this.notesService.getAll(); 
    this.filteredNotes = this.notes;
  }

  //receive event emitted from X-button in child component and call function below
  receiveDeleteEventFromXButton(id: number){
    this.notesService.delete(id)
  }

  filter(query: string){
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    //remove searched terms spaces
    let terms: string[] = query.split(' ');
    
    //remove duplicated terms
    terms = this.removeDuplicate(terms);

    //find notes that matched with terms searched and put them in filteredNotes list
    terms.forEach(term => {
      // store terms that matched
      let matchedResults = this.matchingNotes(term);
      // append to allResults array
      allResults = [...allResults, ...matchedResults];
      // remove duplicated results that would be showed on UI
      let uniqueResults = this.removeDuplicate(allResults);
      //put them in filteredNotes list
      this.filteredNotes = uniqueResults;
    })
  }



  removeDuplicate(arr: Array<any>) : Array<any> { //receive array-like elements
    // set var as a Set (allow store unique values of any type)
    let uniqueElements : Set<any> = new Set<any>();
    arr.forEach(e => uniqueElements.add(e));
    return Array.from(uniqueElements);
  }

  //search for terms that match with notes content
  matchingNotes(query: string): Array<Note> {
    //just garant that searched term will be in lowerCase
    query = query.toLowerCase().trim(); 

    let matchedNotes = this.notes.filter(note => {
      //if exists a note in note[] & includes searched term, return true and add in matchedNotes
      if (note.title && note.title.includes(query)) {
        return true
      }
      if (note.body && note.body.includes(query)) {
        return true
      }
      return false
    });
    return matchedNotes
  }


}
