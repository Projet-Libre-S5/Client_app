import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activities-card.component.html',
  styleUrl: './activities-card.component.scss'
})
export class ActivitiesCardComponent {
  @Input() activities : any[]=[];
  @Input () card_title:string='';


}
