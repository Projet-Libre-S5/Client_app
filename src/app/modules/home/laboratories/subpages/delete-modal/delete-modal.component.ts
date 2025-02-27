import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {


  
  @Input() isVisible :boolean =false;
  @Input() item:any={};
   @Output() closeMeEvent = new EventEmitter();
   @Output() confirmEvent = new EventEmitter();
   closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit(this.item);
  } 


}
