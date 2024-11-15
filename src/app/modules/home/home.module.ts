import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    BrowserModule,
    TableModule,
  ],
})
export class HomeModule {}
