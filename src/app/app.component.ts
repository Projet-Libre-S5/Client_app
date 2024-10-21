import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplatePageComponent } from "./Layouts/template-page/template-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplatePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClientApp';
}
