import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { LaboratoriesComponent } from './modules/home/laboratories/laboratories.component';
import { AnalysesComponent } from './modules/home/analyses/analyses.component';
import { AdressesComponent } from './modules/home/adresses/adresses.component';
import { NotFoundPageComponent } from './Layouts/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Laboratories', component: LaboratoriesComponent },
    { path: 'Analyses', component: AnalysesComponent },
    { path: 'Adresses', component: AdressesComponent },
    { path:'**',component:NotFoundPageComponent},
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },

    
];
