import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

interface Contact {
  fkIdLaboratoire: number;
  fkIdAdresse: number;
  numTelContact: string;
  fax?: string;
  emailContact: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [TableModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  contacts: Contact[] = [];
  contact: Contact = {
    fkIdLaboratoire: 0,
    fkIdAdresse: 0,
    numTelContact: '',
    fax: '',
    emailContact: '',
  };

  saveContact() {
    this.contacts.push({ ...this.contact });
    this.contact = {
      fkIdLaboratoire: 0,
      fkIdAdresse: 0,
      numTelContact: '',
      fax: '',
      emailContact: '',
    };
  }
}
