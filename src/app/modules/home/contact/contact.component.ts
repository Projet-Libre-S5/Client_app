import { Component, OnInit } from '@angular/core';
import {TemplatePageComponent} from "../../../Layouts/template-page/template-page.component";

import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {StyleClassModule} from "primeng/styleclass";
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from "primeng/api";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';
import { ContactsService } from '../../../services/home/contact/contacts.service';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateModalComponent } from './subpages/update-modal/update-modal.component';
import { DeleteModalComponent } from './subpages/delete-modal/delete-modal.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    StyleClassModule,
    CommonModule,
    RouterModule,
    SharedModule,
    PaginatorModule,
    UpdateModalComponent,
    DeleteModalComponent,
    TranslateModule

],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;
  Contacts:any;
  selected_item:any;

  pagination:any;

  paginatedContacts: any[] = []; 





  readonly isLoading$?: Observable<boolean>;



  constructor(
    private fb: FormBuilder,
    private service:ContactsService,
    private AlertService:SweetAlertService
  ) {

  }


  ngOnInit(): void {

  

    this.pagination = {
      current_page: 1,  
      per_page: 3,     
      total: 0    
    };

    this.getContacts();
   
   
  }



  getContacts():void{
    this.service.getAll().subscribe((data: any) => {
      this.Contacts = data;             // Store all data
      this.pagination.total = data.length; // Update total items based on fetched data
      this.updatePaginatedContacts();  

      console.log(data)
     
    },
      (err) => {
        console.log(err)

      }
    )
  }

  updatePaginatedContacts(): void {
    const startIndex = this.pagination.current_page * this.pagination.per_page;
    const endIndex = startIndex + this.pagination.per_page;
    this.paginatedContacts = this.Contacts.slice(startIndex, endIndex); 
  }

  


  OnUpdate(value:any) {
    console.log(value.id);
    console.log(value.street);
    this.service.update(value.id,value).subscribe (
      ()=> {
        this.AlertService.showSuccessAlert("Succès" , "contact modifiée") 
        this.getContacts();
        this.updateModal=false;
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
        this.AlertService.showSuccessAlert("Succès" , "contact supprimé") 
        this.getContacts();
        this.deleteModal=false;
      }, 
      (err) =>{
        console.log(err)
        return this.AlertService.showErrorAlert("Erreur", err?.error?.message);
      }
    )
  }


  

  onPageChange(event: any) {
    this.pagination.current_page = event.page; 
    this.updatePaginatedContacts();            
  }

  
  
  
 
}

