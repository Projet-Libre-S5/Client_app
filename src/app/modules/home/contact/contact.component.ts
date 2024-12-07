import { Component } from '@angular/core';
import {TemplatePageComponent} from "../../../Layouts/template-page/template-page.component";

import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {StyleClassModule} from "primeng/styleclass";
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from "primeng/api";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ 
    ButtonModule,
    TableModule,
    StyleClassModule,
    CommonModule,
    RouterModule,
    SharedModule,
    PaginatorModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contacts:any[]=[];
  selectedContacts:any[]=[];
  isLoading:boolean=true;


}
