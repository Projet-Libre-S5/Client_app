import { Component, OnInit, inject } from '@angular/core';
import {TemplatePageComponent} from "../../../Layouts/template-page/template-page.component";
import { map, Observable } from 'rxjs';
import { CommonModule, NgForOf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';
import { LaboratoryService } from '../../../services/home/laboratory/laboratory.service';
import { TagModule } from 'primeng/tag';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [  
    CommonModule,
    CardModule,
    SharedModule,
    PaginatorModule,
    CardModule,
    SharedModule,
    RouterLink,
    TagModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
   openSidebar: boolean = true;
   isLoading$:boolean=false;
   laboratories: any[] = []; 
   selected_item: any = null; 


   constructor(
    private service:LaboratoryService,
    private AlertService:SweetAlertService,
  ) {

  }


   getLaboratories(): void {
    this.service.getAll().subscribe(
      (data: any) => {
        this.laboratories = data; // Assign data to the laboratories array
        //this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching laboratories:', error);
        //this.isLoading = false;
      }
    );
  }



   OnSearch($event:any){

   }

   HandleSelectedActions($event:any){}


  ngOnInit() {
    this.getLaboratories();

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
