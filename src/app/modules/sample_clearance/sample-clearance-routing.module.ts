import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleClearanceListComponent } from './sample-clearance-list/sample-clearance-list.component';
import { SampleClearanceComponent } from './sample-clearance.component';


const routes: Routes = [
  {
    path: '',
    component: SampleClearanceComponent,
    children: [
      {
        path: 'sample-clearance',
        component: SampleClearanceListComponent,
      },
      { path: '', redirectTo: 'sample-clearance', pathMatch: 'full' },
      { path: '**', redirectTo: 'sample-clearance', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SampleClearanceRoutingModule {}
