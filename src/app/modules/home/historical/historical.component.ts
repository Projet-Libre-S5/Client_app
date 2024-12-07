import { Component } from '@angular/core';
import { ActivitiesCardComponent } from '../../../shared/components/activities-card/activities-card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-historical',
  standalone: true,
  imports: [ActivitiesCardComponent,NgIf ],
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent {

  activitiesLaboratories: any[]=[];
  activitiesAnalyses : any[]=[];


}
