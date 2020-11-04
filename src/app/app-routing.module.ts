import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteListComponent } from './pages/note-list/note-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

const routes: Routes = [
  {  path: '', component: MainLayoutComponent, children: [
    { path: '', component: NoteListComponent }, //inject noteList in MainLayout by routing
    { path: 'new', component: NoteDetailsComponent}, //new before :id, :id above and angular
    { path: ':id', component: NoteDetailsComponent}  // would consider /new as a id parameter
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
