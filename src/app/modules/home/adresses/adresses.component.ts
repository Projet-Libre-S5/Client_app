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

    this.getAdresses();
   
   
  }



  getAdresses():void{
    this.service.getAll().subscribe((data: any) => {
      this.adresses=data
    },
      (err) => {
        console.log(err)

      }
    )
  }

 


  selected_adresses=[]

  

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


  
  
  
 
}
