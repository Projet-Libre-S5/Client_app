import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm:any;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder){}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.pattern]
    });
  }

  submitForm(): void {
    this.submitted=true;
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
    } else {
      console.log("Error: Form is invalid");
    }
  }
}
