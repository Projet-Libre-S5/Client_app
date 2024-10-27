import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,InputTextModule,ToastModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPassword:boolean=false;
  loginForm:any;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder,
    private authService :AuthService,
    private primengConfig: PrimeNGConfig,

){}
  
  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  submitForm(): void {
    this.submitted=true;
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
      this.login()
    } else {
      console.log("Error: Form is invalid");
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password);



   
  }


 


  
}

