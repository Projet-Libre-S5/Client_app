import { Component, OnInit } from '@angular/core';
import { ActivitiesCardComponent } from '../../../shared/components/activities-card/activities-card.component';
import { NgIf } from '@angular/common';
import { ActivitiesService } from '../../../services/home/activities/activities.service';

@Component({
  selector: 'app-historical',
  standalone: true,
  imports: [ActivitiesCardComponent,NgIf ],
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent implements OnInit {

  activitiesLaboratories: any[]=[];
  activitiesAnalyses : any[]=[];

  constructor(private service:ActivitiesService){ }
  
  
  ngOnInit(): void {
    this.getActivities();
  }

  getActivities():void{
    this.service.getAll().subscribe((data: any) => {
     this.activitiesLaboratories=data.filter((activity: any) =>
       activity.entity === "laboratory")
     this.activitiesAnalyses=data.filter((activity: any) =>
      activity.entity === "analyse")
    },
      (err) => {
        console.log(err)

      }
    )
  }
}
