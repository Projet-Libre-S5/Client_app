import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ModalComponent,CommonModule,
    ReactiveFormsModule,TranslateModule,
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
    rue:['',Validators.required],
    ville:['',Validators.required],
    codePostal:['',Validators.required],
    commune:['',Validators.required]
  })

}

  ngOnChanges(changes: SimpleChanges): void {
    this.adresseForm=this.fb.group({
      rue:[this.item.rue,Validators.required],
      ville:[this.item.ville,Validators.required],
      codePostal:[this.item.codePostal,Validators.required],
      commune:[this.item.commune,Validators.required]
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




