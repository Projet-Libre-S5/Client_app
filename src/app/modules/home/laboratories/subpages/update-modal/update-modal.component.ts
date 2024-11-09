import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ModalComponent,CommonModule,
    ReactiveFormsModule,
    CommonModule],
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
 
  laboratoryForm:any;

  logoPreview:any;

  dateActivationEnabled=false;


 

 
  constructor(private fb: FormBuilder){
     
  }
 
  ngOnInit(): void {
    this.laboratoryForm=this.fb.group({
      nom: ['', Validators.required],
      logo: ['', Validators.required],
      nrc: ['', Validators.required],
      active: [false],  
      dateActivation: [''] 
     })
 
 }
 
   ngOnChanges(changes: SimpleChanges): void {
    
    this.laboratoryForm=this.fb.group({
      nom: [this.item.nom, Validators.required],
      logo: [this.item.logo, Validators.required],
      nrc: [this.item.nrc, Validators.required],
      active: [this.item.active],  
      dateActivation: [this.item.dateActivation] 
     })
   }
 
 
 
 
  
  closeMe() {
   this.closeMeEvent.emit();
 }
 confirm() {
   let updated_item;
   if(this.laboratoryForm.valid){
     updated_item ={
           "id":this.item.id,...this.laboratoryForm.value
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
      this.laboratoryForm.patchValue({
        logo: e.target.result.split(',')[1] // Store base64 without metadata
      });
    };
    reader.readAsDataURL(file);
  }
}

toggleDateActivation() {
  const isActive = this.laboratoryForm.get('active')?.value;
  if (isActive) {
    this.dateActivationEnabled=true;
  } else {
    this.dateActivationEnabled=false;
  }}


} 