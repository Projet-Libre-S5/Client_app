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

 adresseForm:any;

 constructor(private fb: FormBuilder){
    
 }

 ngOnInit(): void {
  this.adresseForm=this.fb.group({
    street:['',Validators.required],
    city:['',Validators.required],
    code:['',Validators.required],
    region:['',Validators.required]
  })

}

  ngOnChanges(changes: SimpleChanges): void {
    this.adresseForm=this.fb.group({
      street:[this.item.street,Validators.required],
      city:[this.item.city,Validators.required],
      code:[this.item.code,Validators.required],
      region:[this.item.region,Validators.required]
    })
  }




 
 closeMe() {
  this.closeMeEvent.emit();
}
confirm() {
  let updated_item;
  if(this.adresseForm.valid){
    updated_item ={
          "id":this.item.id,...this.adresseForm.value
        }
  }
  this.confirmEvent.emit(updated_item);
} 



}




