import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';

interface User {
  id: number;
  email: string;
  nomComplet: string;
  profession: string;
  laboratoire: string;
  role: string;
}

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
})
export class UtilisateursComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [
    {
      id: 1,
      email: 'john@example.com',
      nomComplet: 'John Doe',
      profession: 'Chercheur',
      laboratoire: 'Laboratoire A',
      role: 'Chercheur',
    },
    {
      id: 2,
      email: 'jane@example.com',
      nomComplet: 'Jane Smith',
      profession: 'Technicienne',
      laboratoire: 'Laboratoire B',
      role: 'Technicien',
    },
    {
      id: 3,
      email: 'admin@example.com',
      nomComplet: 'Admin User',
      profession: 'Administrateur',
      laboratoire: 'Laboratoire C',
      role: 'Administrateur',
    },
  ];
  laboratories = [
    { label: 'Laboratoire A', value: 'Laboratoire A' },
    { label: 'Laboratoire B', value: 'Laboratoire B' },
    { label: 'Laboratoire C', value: 'Laboratoire C' },
  ];
  roles = [
    { label: 'Administrateur', value: 'Administrateur' },
    { label: 'Technicien', value: 'Technicien' },
    { label: 'Chercheur', value: 'Chercheur' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: [''],
      nomComplet: [''],
      profession: [''],
      numTel: [''],
      signature: [''],
      fkIdLaboratoire: [''],
      role: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const newUser: User = { ...this.userForm.value, id: this.users.length + 1 };
    this.users.push(newUser);
    this.userForm.reset();
    alert('Utilisateur ajouté avec succès');
  }

  editUser(user: User) {
    this.userForm.patchValue(user);
    alert(`Édition de l'utilisateur : ${user.nomComplet}`);
  }

  deleteUser(user: User) {
    this.users = this.users.filter((u) => u.id !== user.id);
    alert('Utilisateur supprimé avec succès');
  }
}
