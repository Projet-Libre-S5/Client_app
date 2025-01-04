import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaboratoryService } from '../../../../services/home/laboratory/laboratory.service';
import { SweetAlertService } from '../../../../shared/services/sweet-alert/sweet-alert.service';
import { ActivitiesService } from '../../../../services/home/activities/activities.service';
import { LanguageService } from '../../../../services/home/language/language.service'
import { TranslateModule } from '@ngx-translate/core';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import {BreadCrumbStepsComponent} from './component/bread-crumb-steps/bread-crumb-steps.component'
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbStepsComponent,
    TranslateModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  public showRole: boolean = true;

  public step: number = 1;

  public logoPreview:any;

  totalSize = 0;
  totalSizePercent = 0;
  UserFormStepOne!: FormGroup;
  showError : boolean = false
  parkingtypes$: any; 
  currentLang:any;











  constructor(private fb: FormBuilder , private router : Router , private userService : UserService , 
    private AlertService : SweetAlertService , private ActivityService:ActivitiesService ,
    private langService: LanguageService 
  ) {
    this.UserFormStepOne = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numTel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profession: ['chercheur', Validators.required],
      role: ['employe'],
    }); 



   }
  
   ngOnInit(): void {

    this.onProfessionChange(); // Initialisation

  
    this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
      console.log(this.currentLang);
    });

   
  }

  
  

  onActiveChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.UserFormStepOne.get('dateActivation')?.enable();
    } else {
      this.UserFormStepOne.get('dateActivation')?.disable();
      this.UserFormStepOne.get('dateActivation')?.setValue('');
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
    if (this.step > 2) return;
    console.log("here");
  
    if (this.step == 1) {
      if (this.UserFormStepOne.valid) {
        this.step++;
      } else {
        Object.keys(this.UserFormStepOne.controls).forEach((field) => {
          const control = this.UserFormStepOne.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      }
    } else if (this.step == 2) {

        if (this.UserFormStepOne.value['profession'] === 'Patient') { 
          let patient_req: any = {
            nrc: this.UserFormStepOne.value['nrc'],
            nom: this.UserFormStepOne.value['nom'],
            prenom: this.UserFormStepOne.value['prenom'],
            numTel: this.UserFormStepOne.value['numTel'],
            email: this.UserFormStepOne.value['email'],
            role: this.UserFormStepOne.value['role'],
        } }
  
        let user_req: any = {
          nrc: this.UserFormStepOne.value['nrc'],
          nom: this.UserFormStepOne.value['nom'],
          prenom: this.UserFormStepOne.value['prenom'],
          numTel: this.UserFormStepOne.value['numTel'],
          email: this.UserFormStepOne.value['email'],
          profession: this.UserFormStepOne.value['profession'],
          role: this.UserFormStepOne.value['role']

        };

        console.log(user_req);
        
        this.userService.create(user_req).subscribe(
          ()=> {
            if(this.UserFormStepOne.value['profession'] === 'Patient') {
              this.userService.create(user_req).subscribe(
                ()=> {
                  this.AlertService.showSuccessAlert('Succes', 'User added succefuly');
                  this.router.navigate(['/dashboard/Laboratories/liste']);
                } 
              )
            } else  {
              this.AlertService.showSuccessAlert('Succes', 'User added succefuly');
              this.router.navigate(['/dashboard/Laboratories/liste']);
            }
           
            
          } ,
          (err) => {
            this.AlertService.showErrorAlert('Errorr', err?.error?.message);
          }
        )

      


   
    }}


  onBackPage() {
    if(this.step <= 1 ) return ;
    this.step--;
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



  onProfessionChange(): void {
    const profession = this.UserFormStepOne.get('profession')?.value;
    this.showRole = profession !== 'patient';

    if (!this.showRole) {
      this.UserFormStepOne.get('role')?.setValue(null); // Réinitialiser le champ rôle
    }
  }


}

