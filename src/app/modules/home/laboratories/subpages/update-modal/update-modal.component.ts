import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ModalComponent,CommonModule,
    ReactiveFormsModule,
    CommonModule,TranslateModule,AccordionModule,ButtonModule ],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent implements OnInit,OnChanges {
 
 
  @Input()
  isVisible:boolean=false;
  @Input()
   item:any;
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
   
  active:string='0';

  openAccordion: number | null = null;


 

  logoPreview:any;

  dateActivationEnabled=false;

  buildingForm!:FormGroup;

 



 
  constructor(private fb: FormBuilder){
     
  }
 
  ngOnInit(): void {
  

     this.buildingForm = this.fb.group({
      
      nrc: ['', Validators.required],
      nom: ['', Validators.required],
      logo: ['', Validators.required],
      active: [false],
      dateActivation: [{ value: '', disabled: true }, Validators.required],
      description:[''],
      numTel:[''],
      fax:[''],
      rue:[''],
      code_postal:[''],
      commun:[''],
      ville:[''],
      email:[''],
      codePostal:['']

    });
 
 }

 onActiveChange(event: Event): void {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.buildingForm.get('dateActivation')?.enable();
  } else {
    this.buildingForm.get('dateActivation')?.disable();
    this.buildingForm.get('dateActivation')?.setValue('');
  }
}

toggleAccordion(index: number): void {
  this.openAccordion = this.openAccordion === index ? null : index;
}
 
 
   ngOnChanges(changes: SimpleChanges): void {
    
    this.buildingForm = this.fb.group({
      
      nrc: [this.item.nrc, Validators.required],
      nom: [this.item.nom, Validators.required],
      logo: [this.item.logo, Validators.required],
      active: [this.item.active],
      dateActivation: [{ value: this.item.dateActivation, disabled: true }, Validators.required],
      description:[this.item.description],
      numTel:[this.item.numTel],
      fax:[this.item.fax],
      rue:[this.item.rue],
      code_postal:[this.item.code_postal],
      commun:[this.item.commun],
      ville:[this.item.ville],
      email:[this.item.email],
      codePostal:[this.item.codePostal]

    });
  }
 
 
 
 
 
  
  closeMe() {
   this.closeMeEvent.emit();
 }
 confirm() {
   let updated_item;
   if(this.buildingForm.valid){
     updated_item ={
           "id":this.item.id,...this.buildingForm.value
         }
   }
   this.confirmEvent.emit(updated_item);
 } 

 onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoPreview = e.target.result; // Set preview
      this.buildingForm.patchValue({
        logo: e.target.result.split(',')[1] // Store base64 without metadata
      });
    };
    reader.readAsDataURL(file);
  }
}




} 