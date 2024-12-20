import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
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
import { StepperModule } from 'primeng/stepper';
import {  NgForOf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';
import { Papa } from 'ngx-papaparse';
import * as XLSX from 'xlsx';





@Component({
  selector: 'app-laboratories',
  standalone: true,
  imports: [PaginatorModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule, UpdateModalComponent, DeleteModalComponent,InputTextModule,StepperModule,NgForOf,CardModule,SharedModule,RouterLink,
    TagModule,TranslateModule
  ],
  templateUrl: './laboratories.component.html',
  styleUrl: './laboratories.component.css'
})
export class LaboratoriesComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;
  menuVisible=false;
  laboratoryForm:any;
  laboratories!:any;
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
  
  isLoading$:boolean=true;







  constructor(
    private fb: FormBuilder,
    private service:LaboratoryService,
    private AlertService:SweetAlertService,
    private sanitizer: DomSanitizer,
    private papa: Papa,
    private laboratoryService:LaboratoryService
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


  toggleMenu(laboratory: any): void{
    laboratory.menuVisible = !laboratory.menuVisible;

  }

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  this.laboratories.forEach((lab:any) => (lab.menuVisible = false));
}


    getLaboratories():void{
      this.service.getAll().subscribe((data: any) => {
        this.laboratories = data.map((laboratory: any) => ({
          ...laboratory,
          menuVisible: false, // Initialisation à false
        }));         
        this.pagination.total = data.length;
        this.updatePaginatedLaboratories();  
        this.isLoading$=false;
        

      },
        (err) => {
          this.isLoading$=true;
          console.log(err)

        }
      )
    }



  updatePaginatedLaboratories(): void {
    const startIndex = this.pagination.current_page * this.pagination.per_page;
    const endIndex = startIndex + this.pagination.per_page;
    this.paginatedLaboratories = this.laboratories.slice(startIndex, endIndex); 
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


  
    onFileChange(event: any): void {
      const target: DataTransfer = <DataTransfer>event.target;
      if (target.files.length !== 1) {
        console.error('Veuillez sélectionner un seul fichier');
        return;
      }
  
      this.isLoading$ = true;
  
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* Lisez les données du fichier Excel */
        const bstr: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        /* Prenez la première feuille */
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
  
        /* Convertissez les données Excel en JSON */
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        // Transformez les données en objets exploitables
        this.processLaboratories(data);
      };
      reader.readAsBinaryString(target.files[0]);
    }
  
    processLaboratories(data: any[]): void {
      try {
        const keys = data[0]; // Les titres des colonnes
        const importedLaboratories = data.slice(1).map((row) => {
          const laboratory: any = {};
          keys.forEach((key: string, index: number) => {
            laboratory[key] = row[index] || ''; 
          });
          laboratory.menuVisible = false; 
          return laboratory;
        });
    
        // Sauvegarde des nouveaux laboratoires dans la base de données
        importedLaboratories.forEach((lab) => {
          this.laboratoryService.create(lab).subscribe(
            (response) => {
              console.log('Laboratoire sauvegardé :', response);
              // Ajout dans this.laboratories sans remplacer les données actuelles
              this.laboratories.push({ ...response, menuVisible: false });
              this.pagination.total = this.laboratories.length;
            },
            (error) => {
              console.error('Erreur lors de la sauvegarde du laboratoire', error);
            }
          );
        });
    
        this.isLoading$ = false;
    
        console.log('Laboratoires importés et sauvegardés :', this.laboratories);
      } catch (error) {
        console.error('Erreur lors du traitement du fichier Excel', error);
        this.isLoading$ = false;
      }
    }



    
  }
