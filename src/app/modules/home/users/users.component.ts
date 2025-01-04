import { Component, OnInit } from '@angular/core';
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
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,TableModule,RouterModule,SharedModule,PaginatorModule,TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  pagination:any;
  paginatedUsers:any;
  isLoading$:any;
  Users:any;

   
  constructor( private fb: FormBuilder,
    private AlertService:SweetAlertService , private service :UserService) {}


   

   
  
    ngOnInit(): void {
      
      this.pagination = {
        current_page: 1,  
        per_page: 3,     
        total: 0    
      };
  
      this.getUsers();
  

     
     
    }
    getUsers():void{
      this.service.getAll().subscribe((data: any) => {
        this.Users = data; 
        console.log(data)
        this.pagination.total = data.length;
        this.updatePaginatedUsers();  
        this.isLoading$=false;
       
      },
        (err) => {
          this.isLoading$=true;
          console.log(err)

        }
      )
    }

    OnUpdate(value:any) {
      console.log(value.id);
      console.log(value.street);
      this.service.update(value.id,value).subscribe (
        ()=> {
          this.AlertService.showSuccessAlert("Succès" , "Laboratoire modifiée") 
          this.getUsers();
         // this.updateModal=false;
        } , 
        (err) =>{
          console.log(err)
          return this.AlertService.showErrorAlert("Erreur", err?.error?.message);
        }
      )
  
    }
  
    OnDelete(value:any){
      this.service.delete(value.id).subscribe(
        ()=> {
          this.AlertService.showSuccessAlert("Succès" , "Laboratoire supprimée") 
          this.getUsers();
         // this.deleteModal=false;
        }, 
        (err) =>{
          console.log(err)
          return this.AlertService.showErrorAlert("Erreur", err?.error?.message);
        }
      )
    }

   

    updatePaginatedUsers(): void {
      const startIndex = this.pagination.current_page * this.pagination.per_page;
      const endIndex = startIndex + this.pagination.per_page;
      this.paginatedUsers = this.Users.slice(startIndex, endIndex); 
    }
 
}

