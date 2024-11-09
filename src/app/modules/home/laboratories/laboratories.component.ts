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
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';
import { LaboratoryService } from '../../../services/home/laboratory/laboratory.service';

@Component({
  selector: 'app-laboratories',
  standalone: true,
  imports: [PaginatorModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule, UpdateModalComponent, DeleteModalComponent,InputTextModule
  ],
  templateUrl: './laboratories.component.html',
  styleUrl: './laboratories.component.css'
})
export class LaboratoriesComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;
  laboratoryForm:any;
  adresses:any;
  selected_item:any={
    street:'',
    city:'',
    code:'',
    region:''
  };

  pagination:any;

  paginatedLaboratories: any[] = []; 

  logoPreview:any;




  readonly isLoading$?: Observable<boolean>;



  constructor(
    private fb: FormBuilder,
    private service:LaboratoryService,
    private AlertService:SweetAlertService
  ) {

  }


  ngOnInit(): void {

    this.laboratoryForm = this.fb.group({
      nom: ['', Validators.required],
      logo: ['', Validators.required],
      nrc: ['', Validators.required],
      active: [false],  
      dateActivation: [''] 
    });

    this.pagination = {
      current_page: 1,  
      per_page: 3,     
      total: 0    
    };

    this.getLaboratories();
   
   
  }



  getLaboratories():void{
    this.service.getAll().subscribe((data: any) => {
      this.adresses = data;             // Store all data
      this.pagination.total = data.length; // Update total items based on fetched data
      this.updatePaginatedLaboratories();  
     
    },
      (err) => {
        console.log(err)

      }
    )
  }

  updatePaginatedLaboratories(): void {
    const startIndex = this.pagination.current_page * this.pagination.per_page;
    const endIndex = startIndex + this.pagination.per_page;
    this.paginatedLaboratories = this.adresses.slice(startIndex, endIndex); // Slice data for current page
  }

  

  OnSubmit():void{
  
      if(this.laboratoryForm.valid){

        let laboratory:any=
      { 

        nom: this.laboratoryForm.value.nom,
      logo: this.laboratoryForm.value.logo,
      nrc: this.laboratoryForm.value.nrc,
      active: this.laboratoryForm.value.active,  
      dateActivation: this.laboratoryForm.value.dateActivation
      }
      
      console.log(laboratory)
        this.service.create(laboratory).subscribe(
          () => {
            this.AlertService.showSuccessAlert("Succès" , "Laboratoire ajoutée") 
            this.getLaboratories();
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
        this.AlertService.showSuccessAlert("Succès" , "Laboratoire modifiée") 
        this.getLaboratories();
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
        this.AlertService.showSuccessAlert("Succès" , "Laboratoire supprimée") 
        this.getLaboratories();
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
    this.updatePaginatedLaboratories();            // Update the paginated addresses displayed
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.laboratoryForm.patchValue({ logo: file });
      this.laboratoryForm.get('logo')?.updateValueAndValidity();
      
      // Si vous souhaitez afficher un aperçu de l'image sélectionnée
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  
 
}
