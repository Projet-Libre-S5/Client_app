import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [PaginatorModule,FormsModule, ReactiveFormsModule,AutoCompleteModule],
  templateUrl: './adresses.component.html',
  styleUrl: './adresses.component.css'
})
export class AdressesComponent {
  formGroup =new FormGroup({
    formControlName: new FormControl<string>(''),
  });

  filteredCountries=["Afourar","Agadir","Agdz","Aghbala","Agni Izimmer"]
    filterCountry($event: any){
      console.log($event)
    }

}
