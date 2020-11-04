import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  //@Input: parent --data flow--> child
  @Input() title: string; // turn these properties dynamic
  @Input() body: string;  // the parent component note-list set the data of these properties
  @Input() cardLink: string;

  //@Output: child --data flow--> parent
  //'delete' will be readen in (eventBinding) in parent
  @Output('delete') delete: EventEmitter<void> = new EventEmitter<void>();

  //Catch #truncator & #cardBody from HTML and set as a view element
  //@ViewChild require 2 parameters, 'selector' and static (true for access on ngOnInit)
  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('cardBody', {static: true}) cardBody: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, 
              private notesService: NotesService) { }

  ngOnInit() {
    // check if theres a text overflow on card-body, if not, then hide the truncator

    //catch CSS property of #cardBody, put in variable style
    let style = window.getComputedStyle(this.cardBody.nativeElement, null);

    // catch height from #cardBody. base 10 is default for decimal system that we use
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10); 

    // if vertical scroll height of cardBody content is bigger than their height (text overflow)
    if (this.cardBody.nativeElement.scrollHeight > viewableHeight) {
      //show fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // else, hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      }
  }

  xButtonClick(){
    //emit event 'delete' read on (delete) eventBinding in parent
    this.delete.emit()
  }


}

