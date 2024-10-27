import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiUrl = environment.serverUrl;
  private Authenticated = false; 

  constructor(
    private http: HttpClient, private router: Router ,
    private messageService: MessageService
  ) { }


  login(email:string,password:string){
    this.http.get<any>(`${this.ApiUrl}/Users`)
  .subscribe(res=>{
    const user = res.find((a:any)=>{
      return a.email === email && a.password ===password
    });
    if(user){
      this.Authenticated=true;
    this.router.navigate(["home"])
    }else{
      this.showWarningToast();
    }
  },err=>{
    this.showErrorToast();
  })
}



isAuthenticated(): boolean {
  return this.Authenticated;
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
  
