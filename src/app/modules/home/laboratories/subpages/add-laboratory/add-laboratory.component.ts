import { Component, ViewChild } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TemplatePageComponent } from '../../../../../Layouts/template-page/template-page.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../shared/services/sweet-alert/sweet-alert.service';
import { LaboratoryService } from '../../../../../services/home/laboratory/laboratory.service';
import {BreadcrumbStepsComponent } from '../../component/breadcrumb/breadcrumb.component'

@Component({
  selector: 'app-add-laboratory',
  standalone: true,
  imports: [
    BadgeModule,
    ButtonModule,
    FileUploadModule,
    FormsModule,
    NgForOf,
    NgIf,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbStepsComponent],
  templateUrl: './add-laboratory.component.html',
  styleUrl: './add-laboratory.component.css'
})
export class AddLaboratoryComponent {


  public step: number = 1;

  public logoPreview:any;




  totalSize = 0;
  totalSizePercent = 0;

  buildingFormStepTwo!: FormGroup;
  buildingFormStepOne!: FormGroup;
  buildingFormStepThree!:FormGroup;
  showError : boolean = false
parkingtypes$: any;


  constructor(private fb: FormBuilder , private router : Router , private laboratoryService : LaboratoryService , private AlertService : SweetAlertService) {
    this.buildingFormStepOne = this.fb.group({
      numTel: ['', Validators.required],
      fax: [''],
      email: ['', [Validators.required, Validators.email]],
      nrc: ['', Validators.required],
      nom: ['', Validators.required],
      active: [false],
      dateActivation: [{ value: '', disabled: true }, Validators.required],
    });

    this.buildingFormStepThree = this.fb.group({
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      commune: ['', Validators.required],
      ville: ['', Validators.required],
    });
   }
  

  onActiveChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.buildingFormStepOne.get('dateActivation')?.enable();
    } else {
      this.buildingFormStepOne.get('dateActivation')?.disable();
      this.buildingFormStepOne.get('dateActivation')?.setValue('');
    }
  }




  image :any = ''
  
  onSelectedFiles(event: any) {

    const file = event?.files?.[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64result = reader.result?.toString().split(',')[1];
      this.image = 'data:image/png;base64,' + base64result;
    };
    reader.onerror = (error) => {
      console.error('Error occurred while reading the file:', error);
    };
    reader.readAsDataURL(file);
  }


  selectParking : any = {}
  ChangeCapacite(event: any) {
    const value = (event.target as HTMLSelectElement).value;
    console.log(value)
    this.selectParking = {...this.selectParking , quantity : value }
  }



    
  onSelectParking(event: any) {
    const selectedId = (event.target as HTMLSelectElement).value;

    console.log(selectedId)
    
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result; 
    

        this.image=e.target.result.split(',')[1] ;
      };
      reader.readAsDataURL(file);
    }
  }


  onNextPage() {
    if (this.step > 3) return;
  
    if (this.step == 1) {
      if (this.buildingFormStepOne.valid) {
        this.step++;
      } else {
        Object.keys(this.buildingFormStepOne.controls).forEach((field) => {
          const control = this.buildingFormStepOne.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      }
    } else if (this.step == 2) {
      if (this.image) {
        this.showError = false;
        this.step++;
      } else {
        this.showError = true;
      }
    } else if (this.step == 3) {
      if (this.buildingFormStepOne.valid) {
        const active = this.buildingFormStepOne.get('active')?.value;
        const dateActivation = active
          ? this.buildingFormStepOne.get('dateActivation')?.value
          : null;
  
        let req: any = {
          nrc: this.buildingFormStepOne.value['nrc'],
          nom: this.buildingFormStepOne.value['nom'],
          active: active,
          dateActivation: dateActivation,
          logo: this.image || null,
          rue: this.buildingFormStepOne.value['rue'],
          codePostal: this.buildingFormStepOne.value['codePostal'],
          commune:this.buildingFormStepOne.value['commune'],
          ville: this.buildingFormStepOne.value['ville'],

        };

  
        this.laboratoryService.create(req).subscribe(
          () => {
            this.AlertService.showSuccessAlert('Succes', 'Laboratory added succefuly');
            this.router.navigate(['/Laboratories']);
          },
          (err) => {
            this.AlertService.showErrorAlert('Erreur', err?.error?.message);
          }
        );
      } else {
        Object.keys(this.buildingFormStepTwo.controls).forEach((field) => {
          const control = this.buildingFormStepTwo.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      }
    }
  }
  

  onBackPage() {
    if(this.step <= 1 ) return ;
    this.step--;
  }
  onTemplatedUpload() {
  }


  AddBuilding() {
    console.log("sending...")  
    console.log("step 3 ")
    console.log(this.buildingFormStepTwo.value)  
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  choose(event: any, chooseCallback: any) {
    chooseCallback();
  }

  uploadEvent(uploadCallback: any) {
    uploadCallback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: number) {
    this.totalSize -= file.size;
    this.totalSizePercent = (this.totalSize / 1000000) * 100;
    removeFileCallback(index);
  }


}
