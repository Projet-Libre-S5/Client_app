import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import {  Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-breadcrumb-steps',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    TranslateModule

  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbStepsComponent {
  @Input() step: number = 1;

  currentLang=localStorage.getItem("lang")

}