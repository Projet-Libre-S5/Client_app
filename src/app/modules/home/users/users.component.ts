import { Component } from '@angular/core';
import { Papa } from "ngx-papaparse";
import {TableModule} from "primeng/table";
import {StyleClassModule} from "primeng/styleclass";
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from "primeng/api";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,TableModule,RouterModule,SharedModule,PaginatorModule,TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  pagination:any;
  paginatedUsers:any;
  isLoading$:any;
   
  constructor( private fb: FormBuilder,
    private AlertService:SweetAlertService) {}


   
  
    ngOnInit(): void {


  

      this.pagination = {
        current_page: 1,  
        per_page: 3,     
        total: 0    
      };
  

     
     
    }
 
}

