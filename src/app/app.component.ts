import { Component, isDevMode, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplatePageComponent } from "./Layouts/template-page/template-page.component";
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplatePageComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   /*ngOnInit(): void {
   if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }*/
  title = 'ClientApp';
}
