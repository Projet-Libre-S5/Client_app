import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  public readonly sidebar_elements = [
<<<<<<< HEAD
    {
      label: 'Dashboard',
      route_path: '/Dashboard',
      icon: 'pi pi-th-large',
      isOpen: false,
      childs: [],
    },
    {
      label: 'Utilisateurs',
      route_path: '/Users',
      icon: 'pi pi-map',
      isOpen: false,
      childs: [],
    },
    {
      label: 'Adresses',
      route_path: '/Adresses',
      icon: 'pi pi-map',
      isOpen: false,
      childs: [],
    },
    { label: 'Patients', route_path: '/Patients', isOpen: false, childs: [] },
    {
      label: 'Laboratoires',
      route_path: '/Laboratories',
      icon: 'pi pi-building',
      isOpen: false,
      childs: [{ label: 'Contacts', route_path: '/Laboratories/Contacts' }],
    },
    {
      label: 'Analyses',
      route_path: '/Analyses',
      icon: 'pi pi-clipboard',
      isOpen: false,
      childs: [
        { label: 'Patients', route_path: '/Patients' },
        { label: 'Epreuves', route_path: '/Analyses/Epreuves' },
        { label: 'Tests', route_path: '/Analyses/Tests' },
      ],
    },
  ];
=======
    { label: "Dashboard", route_path: "/Dashboard", icon:"pi pi-th-large",isOpen:false, childs: [] },
    { label: "Laboratoires",route_path: "/Laboratories" ,icon:"pi pi-building",isOpen:false,childs: []},
    { label: "Contacts",route_path: "/Contacts" ,icon:"pi pi-address-book",isOpen:false,childs: []},
    { label: "Adresses",route_path: "/Adresses" ,icon:"pi pi-map",isOpen:false,childs: []},
    { label: "Analyses",route_path: "/Analyses",icon:"pi pi-clipboard",isOpen:false,childs: [
      { label: "Patients", route_path: "/Analyses/Patients"},
      { label: "Epreuves", route_path: "/Analyses/Epreuves"},
      { label: "Tests", route_path: "/Analyses/Tests"},
    ]},
    { label: "Profil", route_path: "/Account", icon:"pi pi-user",isOpen:false, childs: [
      { label: "Informations", route_path: "/Analyses/Patients"},

    ] }
    ]



    logout(){
        this.authService.logout();
    }
  
   

>>>>>>> ea70597190466fda30ea72826e091f1b0da99a3d

  logout() {
    this.authService.logout();
  }
}
