import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule    
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   
  constructor(private authService:AuthService){
        
  }
  
  public readonly sidebar_elements = [
    { label: "dashboard", route_path: "home", icon:"pi pi-th-large",isOpen:false, childs: [] },
    { label: "laboratories",route_path: "" ,icon:"pi pi-building",isOpen:false,childs: [
      { label: "laboratories_list", route_path: "Laboratories/liste"},
      { label: "add_laboratory", route_path: "Laboratories/Add-laboratory"},
      
    ]},
    { label: "contacts",route_path: "Contacts" ,icon:"pi pi-address-book",isOpen:false,childs: []},
    { label: "adresses",route_path: "Adresses" ,icon:"pi pi-map",isOpen:false,childs: []},
    { label: "analyses",route_path: "Analyses",icon:"pi pi-clipboard",isOpen:false,childs: [
      { label: "patients", route_path: "Analyses/Patients"},
      { label: "epreuves", route_path: "Analyses/Epreuves"},
      { label: "tests", route_path: "Analyses/Tests"},
    ]},
    { label: "users",route_path: "" ,icon:"pi pi-users",isOpen:false,childs: [
      { label: "users_list", route_path: "Users/liste"},
      { label: "add_users", route_path: "Users/add-User"},
      { label: "roles_management", route_path: "Users/roles"},
    ]},
    { label: "historical", route_path: "historical", icon:"pi pi-history",isOpen:false, childs: [] },
    { label: "logout", route_path: "#", icon:"pi pi-sign-out",isOpen:false, childs: [] }

    ]


   
    logout(){
        this.authService.logout();
    }
  
   


}
