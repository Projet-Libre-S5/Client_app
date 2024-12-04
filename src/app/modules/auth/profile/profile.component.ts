import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {OnInit, inject } from '@angular/core';
import {TemplatePageComponent} from "../../../Layouts/template-page/template-page.component";
import { AbstractControl,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";
import {ModalComponent} from "../../../shared/components/modal/modal.component";

import { Observable, first, withLatestFrom } from 'rxjs';

import {AsyncPipe} from "@angular/common";
import {FileUpload, FileUploadModule} from "primeng/fileupload";
import { ImageUploaderComponent } from "./components/image-uploader/image-uploader.component";



interface User {
  password:String,
  first_name:String,
  last_name:String,
  role:String
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FileUploadModule, TemplatePageComponent,ImageUploaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})



export class ProfileComponent {

  

  Form:FormGroup;

  isOpenDeleteConfirmation:boolean=false;


  showNewPasswordPatternError=false;
  showPasswordMismatchError=false;
  showPasswordInvalidError=false;
  secondFormValid=false;


  newImage:string="";



 

  constructor(private fb:FormBuilder){

    this.Form=new FormGroup({
      
      first_name:new FormControl(''),
      last_name:new FormControl(''),
      role:new FormControl(''),
      profession: new FormControl(''),
      password:new FormControl(''),
      phone: new FormControl(''),
      signature : new FormControl(''),
      email : new FormControl(''),
      new_password:new FormControl(''),
      confirm_password:new FormControl(''),
    })}


  ngOnInit(): void {
    this. resetForm();


    }








  
    onSubmit(user:User) {



      let CurrenUser:User=
      { 
        ... user,
        first_name:this.Form.value.first_name,
        last_name:this.Form.value.last_name,
        role:this.Form.value.role  // store image url in email temporary
      }
      
      const { password, new_password, confirm_password } = this.Form.value;

      
    

      this.showPasswordInvalidError=false; 
      this.showNewPasswordPatternError=false;
      this.showPasswordMismatchError=false;

      this.secondFormValid=true;


      if(password){

                if(password !== user.password){
                  this.showPasswordInvalidError=true; 
                  this.secondFormValid=false;

                 }

                 else {

                          if(new_password.length >= 8 && confirm_password == new_password){
      
                            CurrenUser.password=new_password;


                          } else {

                            if(new_password.length < 8) {

                              this.showNewPasswordPatternError=true;
                              this.secondFormValid=false;
                             }
                             if(confirm_password!== new_password){

                              this.showPasswordMismatchError=true;
                              this.secondFormValid=false;
                             }

                          }
                 }
                
      }
      else {
              if(new_password || confirm_password){
                this.showPasswordInvalidError=true; 
                this.secondFormValid=false;
              }

      }



      if(this.Form.valid &&  this.secondFormValid ){
    
    }}

 
     resetForm(){
     
  
     }



    
  
  // dispatching actions
  confirmDelete(){
    this.isOpenDeleteConfirmation=true; 
  }



  delete(){
 
  }


    

  






onFileChange(event:any){
  console.log(event)
}



setImageSrc(base64Image: any) {
 

  this.newImage=base64Image;
  }
  

}
