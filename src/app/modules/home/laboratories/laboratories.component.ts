<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
//import { UpdateModalComponent } from './subpages/update-modal/update-modal.component';
//import { DeleteModalComponent } from './subpages/delete-modal/delete-modal.component';
=======
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule} from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
import { UpdateModalComponent } from "./subpages/update-modal/update-modal.component";
import { DeleteModalComponent } from "./subpages/delete-modal/delete-modal.component";
import { InputTextModule } from "primeng/inputtext"; 
import { SweetAlertService } from '../../../shared/services/sweet-alert/sweet-alert.service';
import { LaboratoryService } from '../../../services/home/laboratory/laboratory.service';
>>>>>>> ea70597190466fda30ea72826e091f1b0da99a3d

@Component({
  selector: 'app-laboratories',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule],
=======
  imports: [PaginatorModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule, UpdateModalComponent, DeleteModalComponent,InputTextModule
  ],
>>>>>>> ea70597190466fda30ea72826e091f1b0da99a3d
  templateUrl: './laboratories.component.html',
  styleUrl: './laboratories.component.css',
})
<<<<<<< HEAD
export class LaboratoriesComponent {
  laboratories = [
    {
      id: 1,
      nom: 'Laboratoire Alpha',
      logo: 'https://example.com/logo-alpha.png',
      nrc: 'RC123456',
      active: true,
      dateActivation: '2023-01-15',
    },
    {
      id: 2,
      nom: 'Laboratoire Beta',
      logo: 'https://example.com/logo-beta.png',
      nrc: 'RC789012',
      active: false,
      dateActivation: '2022-11-30',
    },
    {
      id: 3,
      nom: 'Laboratoire Gamma',
      logo: 'https://example.com/logo-gamma.png',
      nrc: 'RC345678',
      active: true,
      dateActivation: '2023-03-22',
    },
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  }

  onSubmit(form: any) {
    const newLab = {
      id: this.laboratories.length + 1,
      nom: form.value.nom,
      logo: 'https://example.com/default-logo.png', // For demo purposes
      nrc: form.value.nrc,
      active: form.value.active === 'true',
      dateActivation: form.value.dateActivation,
    };
    this.laboratories.push(newLab);
    form.reset();
    alert('Laboratoire ajouté avec succès');
  }

  editLab(lab: any) {
    alert(`Édition du laboratoire : ${lab.nom}`);
  }

  deleteLab(id: number) {
    this.laboratories = this.laboratories.filter((lab) => lab.id !== id);
    alert('Laboratoire supprimé avec succès');
  }
=======
export class LaboratoriesComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;
  laboratoryForm:any;
  laboratories:any;
  selected_item:any={
      nom:"",
      logo:"",
      nrc: "",
      active:"",  
      dateActivation:""
  };


  pagination:any;

  paginatedLaboratories: any[] = []; 

  logoPreview:any;

  imageSource:any;
  
  




  readonly isLoading$?: Observable<boolean>;



  constructor(
    private fb: FormBuilder,
    private service:LaboratoryService,
    private AlertService:SweetAlertService,
    private sanitizer: DomSanitizer
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
      this.laboratories = data;            
      this.pagination.total = data.length;
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
    this.paginatedLaboratories = this.laboratories.slice(startIndex, endIndex); 
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
    this.pagination.current_page = event.page; 
    this.updatePaginatedLaboratories();   }        

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result; 
        this.laboratoryForm.patchValue({
          logo: e.target.result.split(',')[1] 
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  
 
>>>>>>> ea70597190466fda30ea72826e091f1b0da99a3d
}
