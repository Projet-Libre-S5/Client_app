import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';

//import * as citiesData from '../../../../assets/data/moroccan-cities.json';



@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [PaginatorModule,FormsModule, ReactiveFormsModule,AutoCompleteModule,CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    TableModule
  ],
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.css'
})
export class AdressesComponent implements OnInit {
 


  isOpenDeleteFloor: boolean = false;
  selectedFloor: any;

  @Output() close = new EventEmitter<boolean>(); // Added type EventEmitter<boolean>
  etageForm!: FormGroup;
  image: any = {};
  
  Selected_Building : any   = null ;

  readonly floors$?: Observable<any>;
  readonly buildings$?: Observable<any>;
  readonly isLoading$?: Observable<boolean>;
  readonly error$?: Observable<string | null>;
  readonly floorsData?: Observable<any[]>;
  selectedfloors: any;
  isOpenEditFloor: boolean = false;
  Pagination$?: Observable<any>;


  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.etageForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      building_id: ['', Validators.required],
      description: ['', Validators.required],
    });
   
  }
  clearFileUpload() {
  }



  onSelectBuildingType(event: Event) {
    const selectedBuildingId = (event.target as HTMLSelectElement).value;
    console.log(selectedBuildingId)
    this.buildings$!.subscribe(buildingTypes => {
      const selectedBuildingType = buildingTypes.data.find((building: { id: string; }) => building.id == selectedBuildingId);
      if (selectedBuildingType) {
        console.log('Selected client type:', selectedBuildingType);
        this.Selected_Building = selectedBuildingType
      }
    });
  }


  onSubmit(): void {
   
  }

  onFileChange(event: any): void {
    const file = event?.files?.[0];
    if (file) {
      this.convertToBase64(file);
    }
  }
  
  convertToBase64(file: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64result = reader.result?.toString().split(',')[1];
      this.image = base64result;
    };
    reader.onerror = (error) => {
      console.error('Error occurred while reading the file:', error);
    };
    reader.readAsDataURL(file);
  }


  onPageChange($event: PaginatorState) {
   
  }


  openDeleteFloor(floor: any): void {
    this.selectedFloor = floor;
    this.isOpenDeleteFloor = true;
  }
  OpenEditFloor(item: any): void {
    this.selectedFloor = item
    this.isOpenEditFloor = true;
  }

  Delete(): void {
   
  }

  private highlightErrors(): void {
    Object.keys(this.etageForm.controls).forEach((field) => {
      const control = this.etageForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
 
}
