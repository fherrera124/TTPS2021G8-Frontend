import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyCanceledListComponent } from './study-list/components/study-canceled/study-canceled-list.component';
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
      {
        path: 'studies-canceled',
        component: StudyCanceledListComponent,
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
