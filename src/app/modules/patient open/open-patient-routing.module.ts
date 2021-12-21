import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenPatientComponent } from './open-patient.component';
import { CreateOpenPatientComponent } from './open-patient/open-patient.component';


const routes: Routes = [
  {
    path: '',
    component: OpenPatientComponent,
    children: [
      {
        path: 'create',
        component: CreateOpenPatientComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenPatientRoutingModule {}
