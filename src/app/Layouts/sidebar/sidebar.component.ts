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
    { label: "Dashboard", route_path: "/Dashboard", icon:"pi pi-th-large",isOpen:false, childs: [] },
    { label: "Adresses",route_path: "/Adresses" ,icon:"pi pi-map",isOpen:false,childs: []},
    { label: "Laboratoires",route_path: "/Laboratories" ,icon:"pi pi-building",isOpen:false,childs: [
      { label: "Contacts", route_path: "/Laboratories/Contacts"},
    ]},
    { label: "Analyses",route_path: "/Analyses",icon:"pi pi-clipboard",isOpen:false,childs: [
      { label: "Patients", route_path: "/Analyses/Patients"},
      { label: "Epreuves", route_path: "/Analyses/Epreuves"},
      { label: "Tests", route_path: "/Analyses/Tests"},
    ]},
    ]



    logout(){
        this.authService.logout();
    }
  
   


}
