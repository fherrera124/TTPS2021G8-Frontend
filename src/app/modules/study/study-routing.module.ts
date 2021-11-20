import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyDelayedListComponent } from './study-list/components/study-delayed/study-delayed-list.component';
import { StudyListComponent } from './study-list/study-list.component';
import { StudyComponent } from './study.component';

const routes: Routes = [
  {
    path: '',
    component: StudyComponent,
    children: [
      {
        path: 'studies',
        component: StudyListComponent,
      },
      {
        path: 'studies-delayed',
        component: StudyDelayedListComponent,
      },
      { path: '', redirectTo: 'studies', pathMatch: 'full' },
      { path: '**', redirectTo: 'studies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyRoutingModule {}
