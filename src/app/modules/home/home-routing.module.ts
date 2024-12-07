import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { AdressesComponent } from './adresses/adresses.component';
import { NotFoundPageComponent } from '../../Layouts/not-found-page/not-found-page.component';
import { AddLaboratoryComponent } from './laboratories/subpages/add-laboratory/add-laboratory.component';
import { HistoricalComponent } from './historical/historical.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'Laboratories/liste', component: LaboratoriesComponent },
  { path: 'Laboratories/Add-laboratory', component: AddLaboratoryComponent },
  { path: 'Analyses', component: AnalysesComponent },
  { path: 'Adresses', component: AdressesComponent },
  { path: 'historical', component: HistoricalComponent },
  {path:'Contacts',component:ContactComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}


  
