import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule} from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
import { UpdateModalComponent } from "./subpages/update-modal/update-modal.component";
import { DeleteModalComponent } from "./subpages/delete-modal/delete-modal.component";
import { InputTextModule } from "primeng/inputtext"; 
import { AdressService } from '../../../services/home/adress/adress.service';
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';


//import * as citiesData from '../../../../assets/data/moroccan-cities.json';



@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [PaginatorModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule, UpdateModalComponent, DeleteModalComponent,InputTextModule
  ],
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.css'
})
export class AdressesComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;
  adresseForm:any;
  adresses:any;
  selected_item:any={
    street:'',
    city:'',
    code:'',
    region:''
  };

  pagination:any;

  paginatedAdresses: any[] = []; 





  readonly isLoading$?: Observable<boolean>;



  constructor(
    private fb: FormBuilder,
    private service:AdressService,
    private AlertService:SweetAlertService
  ) {

  }


  ngOnInit(): void {

    this.adresseForm=this.fb.group({
      street:['',Validators.required],
      city:['',Validators.required],
      code:['',Validators.required],
      region:['',Validators.required]
    })

    this.pagination = {
      current_page: 1,  
      per_page: 3,     
      total: 0    
    };

    this.getAdresses();
   
   
  }



  getAdresses():void{
    this.service.getAll().subscribe((data: any) => {
      this.adresses = data;             // Store all data
      this.pagination.total = data.length; // Update total items based on fetched data
      this.updatePaginatedAdresses();  
     
    },
      (err) => {
        console.log(err)

      }
    )
  }

  updatePaginatedAdresses(): void {
    const startIndex = this.pagination.current_page * this.pagination.per_page;
    const endIndex = startIndex + this.pagination.per_page;
    this.paginatedAdresses = this.adresses.slice(startIndex, endIndex); // Slice data for current page
  }

  

  OnSubmit():void{
  
       if(this.adresseForm.valid){

        let adress:any=
      { 
        street:this.adresseForm.value.street,
      city:this.adresseForm.value.city,
      code:this.adresseForm.value.code,
      region:this.adresseForm.value.region
      }
      
      console.log(adress)
        this.service.create(adress).subscribe(
          () => {
            this.AlertService.showSuccessAlert("Succès" , "adresse ajoutée") 
            this.getAdresses();
          } , 
          (err) =>{
            return this.AlertService.showErrorAlert("Erreur", err?.error?.message);
          }
        )
       }
       else {
        console.log("invalid form")
       }
  }



  OnUpdate(value:any) {
    console.log(value.id);
    console.log(value.street);
    this.service.update(value.id,value).subscribe (
      ()=> {
        this.AlertService.showSuccessAlert("Succès" , "adresse modifiée") 
        this.getAdresses();
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
        this.AlertService.showSuccessAlert("Succès" , "adresse supprimée") 
        this.getAdresses();
        this.deleteModal=false;
      }, 
      (err) =>{
        console.log(err)
        return this.AlertService.showErrorAlert("Erreur", err?.error?.message);
      }
    )
  }


  

  onPageChange(event: any) {
    this.pagination.current_page = event.page; // Update current page
    this.updatePaginatedAdresses();            // Update the paginated addresses displayed
  }

  
  
  
 
}
