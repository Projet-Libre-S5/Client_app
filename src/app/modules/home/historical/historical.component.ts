import { Component, OnInit } from '@angular/core';
import { ActivitiesCardComponent } from '../../../shared/components/activities-card/activities-card.component';
import { ActivitiesService } from '../../../services/home/activities/activities.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-historical',
  standalone: true,
  imports: [ActivitiesCardComponent,TranslateModule ],
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent implements OnInit {

  activitiesLaboratories: any[]=[];
  activitiesAnalyses : any[]=[];

  constructor(private service:ActivitiesService){ }
  
  
  ngOnInit(): void {
    this.getActivities();
    console.log(this.activitiesLaboratories);
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
