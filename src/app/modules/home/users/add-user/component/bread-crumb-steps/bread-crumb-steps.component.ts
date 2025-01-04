import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../../../services/home/language/language.service';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb-steps',
  standalone: true,
  imports: [
    NgIf,
        NgClass,
        TranslateModule,
  ],
  templateUrl: './bread-crumb-steps.component.html',
  styleUrl: './bread-crumb-steps.component.css'
})
export class BreadCrumbStepsComponent {

  @Input() step: number = 1;

  currentLang:any;
 
  constructor(private langService:LanguageService  ){}


  ngOnInit(): void {
    this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
      console.log(this.currentLang);
    });
  }
}
