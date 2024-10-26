import { Component } from '@angular/core';
import { TemplatePageComponent } from "../../Layouts/template-page/template-page.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TemplatePageComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
