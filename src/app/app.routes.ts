import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { LaboratoriesComponent } from './modules/home/laboratories/laboratories.component';
import { AnalysesComponent } from './modules/home/analyses/analyses.component';
import { AdressesComponent } from './modules/home/adresses/adresses.component';

export const routes: Routes = [
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Laboratories', component: LaboratoriesComponent },
    { path: 'Analyses', component: AnalysesComponent },
    { path: 'Adresses', component: AdressesComponent },
];
