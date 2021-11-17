import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferringPhysicianListComponent } from './referring-physician-list/referring-physician-list.component';
import { ReferringPhysicianComponent } from './referring-physician.component';


const routes: Routes = [
  {
    path: '',
    component: ReferringPhysicianComponent,
    children: [
      {
        path: 'referring-physician',
        component: ReferringPhysicianListComponent,
      },
      { path: '', redirectTo: 'referring-physician', pathMatch: 'full' },
      { path: '**', redirectTo: 'referring-physician', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferringPhysicianRoutingModule {}
