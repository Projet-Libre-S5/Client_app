import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalysesComponent } from './analyses/analyses.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, FormsModule],
})
export class HomeModule {}
