import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
import { UpdateModalComponent } from "./subpages/update-modal/update-modal.component";
import { DeleteModalComponent } from "./subpages/delete-modal/delete-modal.component";

//import * as citiesData from '../../../../assets/data/moroccan-cities.json';



@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [PaginatorModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule, UpdateModalComponent, DeleteModalComponent],
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.css'
})
export class AdressesComponent implements OnInit {

  updateModal:boolean=false;
  deleteModal:boolean=false;



  readonly isLoading$?: Observable<boolean>;



  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
   
  }

 
  adresses=[{"adresse":"RUE MOHAMMED 5","code":444,"city":"Agadir","region":"Souss Massa Daraa"},
    {"adresse":"RUE MOHAMMED 5","code":444,"city":"Agadir","region":"Souss Massa Daraa"},
    {"adresse":"RUE MOHAMMED 5","code":444,"city":"Agadir","region":"Souss Massa Daraa"}


  ]

  selected_adresses=[]



  


  
  
  
 
}
