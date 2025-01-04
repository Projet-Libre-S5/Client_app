import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import {  Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../services/home/language/language.service';


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

  currentLang:any;
 
  constructor(private   langService:LanguageService  ){}


  ngOnInit(): void {
    this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
      console.log(this.currentLang);
    });
  }

}