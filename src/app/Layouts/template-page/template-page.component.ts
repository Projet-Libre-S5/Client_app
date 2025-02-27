import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'template-page',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './template-page.component.html',
  styleUrl: './template-page.component.css'
})
export class TemplatePageComponent {

}
