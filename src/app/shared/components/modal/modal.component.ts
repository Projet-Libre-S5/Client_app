import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isVisible :boolean =false;
  @Input() title :string ="";
  @Input() ConfirmationLabel :string ="";
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm(){
    this.confirmEvent.emit();
  }

}
