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






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,InputTextModule,ToastModule,ButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPassword:boolean=false;
  loginForm:any;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder,private http: HttpClient, private router: Router ,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
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
    this.http.get<any>("http://localhost:3000/Users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if(user){
      this.router.navigate(["home"])
      }else{
        this.showWarningToast();
      }
    },err=>{
      this.showErrorToast();
    })
  }


  showWarningToast() {
    this.messageService.add({
        severity: 'warn',
        summary: 'Erreur de connexion',
        detail: 'Utilisateur non trouvé',
        key: 'tl'
    });
}

showErrorToast() { 
    this.messageService.add({
        severity: 'error',
        summary: 'Erreur de connexion',
        detail: 'Problème de connexion au serveur',
        key: 'tl'
    });
  }


  
}

