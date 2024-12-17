import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ModalComponent,TranslateModule,ReactiveFormsModule],
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
 
  contactForm:any;
 
  constructor(private fb: FormBuilder){
     
  }
 
  ngOnInit(): void {
   this.contactForm=this.fb.group({
    numTel:['',Validators.required],
     fax:['',Validators.required],
     email:['',Validators.required]
       })
 
 }
 
   ngOnChanges(changes: SimpleChanges): void {
     this.contactForm=this.fb.group({
      numTel:[this.item.numTel,Validators.required],
      fax:[this.item.fax,Validators.required],
      email:[this.item.email,Validators.required],
     })
   }
 
 
 
 
  
  closeMe() {
   this.closeMeEvent.emit();
 }
 confirm() {
   let updated_item;
   if(this.contactForm.valid){
     updated_item ={
           "id":this.item.id,...this.contactForm.value
         }
   }
   this.confirmEvent.emit(updated_item);
 } 
 
 
 
 }
 
 
 
 
 