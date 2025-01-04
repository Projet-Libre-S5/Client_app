import { Component, ViewChild } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TemplatePageComponent } from '../../../../../Layouts/template-page/template-page.component';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../shared/services/sweet-alert/sweet-alert.service';
import { LaboratoryService } from '../../../../../services/home/laboratory/laboratory.service';
import {BreadcrumbStepsComponent } from '../../component/breadcrumb/breadcrumb.component'
import { ActivitiesService } from '../../../../../services/home/activities/activities.service';
import { ContactsService } from '../../../../../services/home/contact/contacts.service';
import { AdressService } from '../../../../../services/home/adress/adress.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../services/home/language/language.service';




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
    BreadcrumbStepsComponent,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './add-laboratory.component.html',
  styleUrl: './add-laboratory.component.css'
})
export class AddLaboratoryComponent implements OnInit {


  public step: number = 1;

  public logoPreview:any="";

  totalSize = 0;
  totalSizePercent = 0;
  buildingFormStepTwo!: FormGroup;
  buildingFormStepOne!: FormGroup;
  buildingFormStepThree!:FormGroup;
  showError : boolean = false
  parkingtypes$: any; 
  currentLang:any;











  constructor(private fb: FormBuilder , private router : Router , private laboratoryService : LaboratoryService , 
    private AlertService : SweetAlertService , private ActivityService:ActivitiesService ,private ContactsService:ContactsService,
    private adresseService:AdressService,
    private langService: LanguageService
  ) {
    this.buildingFormStepOne = this.fb.group({
      
    


      nrc: ['', Validators.required],
      nom: ['', Validators.required],
      active: [false],
      dateActivation: [{ value: '', disabled: true }, Validators.required],
      description:['']
    });

    this.buildingFormStepThree = this.fb.group({
      numTel: ['', Validators.required],
      fax: [''],
      email: ['', [Validators.required, Validators.email]],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      commune: ['', Validators.required],
      ville: ['', Validators.required],
    });



   }
  
   ngOnInit(): void {
  
    this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
      console.log(this.currentLang);
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
  
        let req_lab: any = {
          nrc: this.buildingFormStepOne.value['nrc'],
          nom: this.buildingFormStepOne.value['nom'],
          active: active,
          dateActivation: dateActivation,
          description:this.buildingFormStepOne.value['description'],
          logo: this.image || null,
          rue: this.buildingFormStepThree.value['rue'],
          codePostal: this.buildingFormStepThree.value['codePostal'],
          commune:this.buildingFormStepThree.value['commune'],
          ville: this.buildingFormStepThree.value['ville'],
          numTel: this.buildingFormStepThree.value['numTel'],
          fax: this.buildingFormStepThree.value['fax'],
          email: this.buildingFormStepThree.value['email']

        };

        let req_contact:any ={
          nom: this.buildingFormStepOne.value['nom'],
          numTel: this.buildingFormStepThree.value['numTel'],
          fax: this.buildingFormStepThree.value['fax'],
          email: this.buildingFormStepThree.value['email']
        }

        let req_adresse:any={
          nom: this.buildingFormStepOne.value['nom'],
          rue: this.buildingFormStepThree.value['rue'],
          codePostal: this.buildingFormStepThree.value['codePostal'],
          commune:this.buildingFormStepThree.value['commune'],
          ville: this.buildingFormStepThree.value['ville']
        }





  
        this.laboratoryService.create(req_lab).subscribe(
          () => {

            let Success:boolean=false;

             this.ContactsService.create(req_contact).subscribe (()=>{
                  Success=true;
             });


             console.log(req_contact);
                  Success=false;

             this.adresseService.create(req_adresse).subscribe(()=>{
                  Success=true;
             })




            
            const activity = {
              event: "created",
              entity: "laboratory",
              titre: this.buildingFormStepOne.value['nom'],
              user:localStorage.getItem('name'),
              role:localStorage.getItem('role') ,
              updated_at: new Date()
            };
            this.ActivityService.create(activity).subscribe(
              ()=> {
                if ( Success) {
                  this.AlertService.showSuccessAlert('Succes', 'Laboratory added succefuly');
                this.router.navigate(['/dashboard/Laboratories/liste']);
                }

                
              } ,
              (err) => {
                this.AlertService.showErrorAlert('Errorr', err?.error?.message);
              }
            ) 
            
         
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
