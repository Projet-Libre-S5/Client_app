import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
//import { UpdateModalComponent } from './subpages/update-modal/update-modal.component';
//import { DeleteModalComponent } from './subpages/delete-modal/delete-modal.component';

@Component({
  selector: 'app-laboratories',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule],
  templateUrl: './laboratories.component.html',
  styleUrl: './laboratories.component.css',
})
export class LaboratoriesComponent {
  laboratories = [
    {
      id: 1,
      nom: 'Laboratoire Alpha',
      logo: 'https://example.com/logo-alpha.png',
      nrc: 'RC123456',
      active: true,
      dateActivation: '2023-01-15',
    },
    {
      id: 2,
      nom: 'Laboratoire Beta',
      logo: 'https://example.com/logo-beta.png',
      nrc: 'RC789012',
      active: false,
      dateActivation: '2022-11-30',
    },
    {
      id: 3,
      nom: 'Laboratoire Gamma',
      logo: 'https://example.com/logo-gamma.png',
      nrc: 'RC345678',
      active: true,
      dateActivation: '2023-03-22',
    },
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  }

  onSubmit(form: any) {
    const newLab = {
      id: this.laboratories.length + 1,
      nom: form.value.nom,
      logo: 'https://example.com/default-logo.png', // For demo purposes
      nrc: form.value.nrc,
      active: form.value.active === 'true',
      dateActivation: form.value.dateActivation,
    };
    this.laboratories.push(newLab);
    form.reset();
    alert('Laboratoire ajouté avec succès');
  }

  editLab(lab: any) {
    alert(`Édition du laboratoire : ${lab.nom}`);
  }

  deleteLab(id: number) {
    this.laboratories = this.laboratories.filter((lab) => lab.id !== id);
    alert('Laboratoire supprimé avec succès');
  }
}
