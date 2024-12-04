import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { AdressesComponent } from './adresses/adresses.component';
import { NotFoundPageComponent } from '../../Layouts/not-found-page/not-found-page.component';
import { AddLaboratoryComponent } from './laboratories/subpages/add-laboratory/add-laboratory.component';

const routes: Routes = [
  { path: 'home', redirectTo: '/Dashboard', pathMatch: 'full' }, // Redirect root to /home
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Laboratories', component: LaboratoriesComponent },
  { path: 'Laboratories/Add-laboratory', component: AddLaboratoryComponent },
  { path: 'Analyses', component: AnalysesComponent },
  { path: 'Adresses', component: AdressesComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}


  
