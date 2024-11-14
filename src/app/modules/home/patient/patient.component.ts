import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';

interface Patient {
  id: number;
  nomComplet: string;
  dateNaissance: string;
  lieuDeNaissance: string;
  sexe: string;
  typePieceIdentite: string;
  numPieceIdentite: string;
  adresse: string;
  numTel: string;
  email: string;
  visiblePour: string;
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [
    // Sample data for demonstration
    {
      id: 1,
      nomComplet: 'Jean Dupont',
      dateNaissance: '1985-03-15',
      lieuDeNaissance: 'Paris',
      sexe: 'M',
      typePieceIdentite: 'CNI',
      numPieceIdentite: '123456789',
      adresse: '123 Rue de la Santé, 75000 Paris',
      numTel: '0123456789',
      email: 'jean.dupont@email.com',
      visiblePour: 'Médecins, Infirmiers',
    },
    {
      id: 2,
      nomComplet: 'Marie Martin',
      dateNaissance: '1990-07-22',
      lieuDeNaissance: 'Lyon',
      sexe: 'F',
      typePieceIdentite: 'Passeport',
      numPieceIdentite: 'AB123456',
      adresse: '456 Avenue du Progrès, 69000 Lyon',
      numTel: '0987654321',
      email: 'marie.martin@email.com',
      visiblePour: 'Médecins',
    },
    {
      id: 3,
      nomComplet: 'Jean Dupont',
      dateNaissance: '1985-03-15',
      lieuDeNaissance: 'Paris',
      sexe: 'M',
      typePieceIdentite: 'CNI',
      numPieceIdentite: '123456789',
      adresse: '123 Rue de la Santé, 75000 Paris',
      numTel: '0123456789',
      email: 'jean.dupont@email.com',
      visiblePour: 'Médecins, Infirmiers',
    },
    {
      id: 4,
      nomComplet: 'Jean Dupont',
      dateNaissance: '1985-03-15',
      lieuDeNaissance: 'Paris',
      sexe: 'M',
      typePieceIdentite: 'CNI',
      numPieceIdentite: '123456789',
      adresse: '123 Rue de la Santé, 75000 Paris',
      numTel: '0123456789',
      email: 'jean.dupont@email.com',
      visiblePour: 'Médecins, Infirmiers',
    },
    {
      id: 5,
      nomComplet: 'Jean Dupont',
      dateNaissance: '1985-03-15',
      lieuDeNaissance: 'Paris',
      sexe: 'M',
      typePieceIdentite: 'CNI',
      numPieceIdentite: '123456789',
      adresse: '123 Rue de la Santé, 75000 Paris',
      numTel: '0123456789',
      email: 'jean.dupont@email.com',
      visiblePour: 'Médecins, Infirmiers',
    },
    {
      id: 6,
      nomComplet: 'Jean Dupont',
      dateNaissance: '1985-03-15',
      lieuDeNaissance: 'Paris',
      sexe: 'M',
      typePieceIdentite: 'CNI',
      numPieceIdentite: '123456789',
      adresse: '123 Rue de la Santé, 75000 Paris',
      numTel: '0123456789',
      email: 'jean.dupont@email.com',
      visiblePour: 'Médecins, Infirmiers',
    },
    // Additional patients here...
  ];
  currentPage: number = 1;
  pageSize: number = 5;
  selectedPatient: Patient | null = null;

  constructor() {}

  ngOnInit(): void {}

  get paginatedPatients(): Patient[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.patients.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.patients.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  addOrUpdatePatient(patient: Patient): void {
    if (this.selectedPatient) {
      // Update existing patient
      const index = this.patients.findIndex(
        (p) => p.id === this.selectedPatient!.id
      );
      this.patients[index] = patient;
    } else {
      // Add new patient
      patient.id = this.patients.length + 1;
      this.patients.push(patient);
    }
    this.resetForm();
  }

  editPatient(patient: Patient): void {
    this.selectedPatient = { ...patient };
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter((p) => p.id !== id);
  }

  resetForm(): void {
    this.selectedPatient = null;
  }
  /*createNewPatient(): void {
    this.selectedPatient = {
      id: 9,
      nomComplet: '',
      dateNaissance: '',
      lieuDeNaissance: '',
      sexe: 'M', // Valeur par défaut
      typePieceIdentite: 'CNI', // Valeur par défaut
      numPieceIdentite: '',
      adresse: '',
      numTel: '',
      email: '',
      visiblePour: '',
    };
  }     */
}
