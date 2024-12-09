import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   
  constructor(private authService:AuthService){
        
  }
  
  public readonly sidebar_elements = [
    { label: "Dashboard", route_path: "home", icon:"pi pi-th-large",isOpen:false, childs: [] },
    { label: "Laboratoires",route_path: "" ,icon:"pi pi-building",isOpen:false,childs: [
      { label: "Liste des Laboratoires", route_path: "Laboratories/liste"},
      { label: "Ajouter Laboratoire", route_path: "Laboratories/Add-laboratory"},
      
    ]},
    { label: "Contacts",route_path: "Contacts" ,icon:"pi pi-address-book",isOpen:false,childs: []},
    { label: "Adresses",route_path: "Adresses" ,icon:"pi pi-map",isOpen:false,childs: []},
    { label: "Analyses",route_path: "Analyses",icon:"pi pi-clipboard",isOpen:false,childs: [
      { label: "Patients", route_path: "Analyses/Patients"},
      { label: "Epreuves", route_path: "Analyses/Epreuves"},
      { label: "Tests", route_path: "Analyses/Tests"},
    ]},
    { label: "Utilisateurs",route_path: "" ,icon:"pi pi-users",isOpen:false,childs: [
      { label: "Liste des utilisateurs ", route_path: "Users/liste"},
      { label: "Ajouter un utilisateur", route_path: "Users/add-User"},
      { label: "Gestion des roles", route_path: "Users/roles"},
    ]},
    { label: "Historiques", route_path: "historical", icon:"pi pi-history",isOpen:false, childs: [] }
    ]



    logout(){
        this.authService.logout();
    }
  
   


}
