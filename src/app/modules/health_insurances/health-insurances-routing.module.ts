import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthInsurancesListComponent } from './health-insurances-list/health-insurances-list.component';

import { HealthInsurancesComponent } from './health-insurances.component';

const routes: Routes = [
  {
    path: '',
    component: HealthInsurancesComponent,
    children: [
      {
        path: 'health-insurances',
        component: HealthInsurancesListComponent,
      },
      { path: '', redirectTo: 'health-insurances', pathMatch: 'full' },
      { path: '**', redirectTo: 'health-insurances', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  HealthInsurancesRoutingModule {}
