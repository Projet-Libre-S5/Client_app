import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './analyses.component.html',
  styleUrls: ['./analyses.component.css'],
})
export class AnalysesComponent {
  analyses = [
    {
      id: 1,
      nom: 'Analyse sanguine',
      description: 'Analyse complète du sang',
      laboratoireId: 1,
      dateCreation: '2023-04-10',
    },
    {
      id: 2,
      nom: 'Analyse d’urine',
      description: 'Analyse biochimique de l’urine',
      laboratoireId: 2,
      dateCreation: '2023-05-12',
    },
    {
      id: 3,
      nom: 'Analyse génétique',
      description: 'Séquençage de l’ADN',
      laboratoireId: 3,
      dateCreation: '2023-06-15',
    },
  ];

  onSubmit(form: any) {
    const newAnalyse = {
      id: this.analyses.length + 1,
      nom: form.value.nom,
      description: form.value.description,
      laboratoireId: form.value.laboratoireId,
      dateCreation: new Date().toISOString().split('T')[0],
    };
    this.analyses.push(newAnalyse);
    form.reset();
    alert('Analyse ajoutée avec succès');
  }

  editAnalyse(analyse: any) {
    alert(`Édition de l'analyse : ${analyse.nom}`);
  }

  deleteAnalyse(id: number) {
    this.analyses = this.analyses.filter((analyse) => analyse.id !== id);
    alert('Analyse supprimée avec succès');
  }
}
