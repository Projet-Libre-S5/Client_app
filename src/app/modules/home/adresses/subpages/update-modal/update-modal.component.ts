import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent {
 @Input()
 isVisible:boolean=false;
 @Output() closeMeEvent = new EventEmitter();
 @Output() confirmEvent = new EventEmitter();
 
 closeMe() {
  this.closeMeEvent.emit();
}
confirm() {
  this.confirmEvent.emit();
} 
 
}
