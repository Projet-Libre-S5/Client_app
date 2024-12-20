import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../../../services/home/language/language.service';

@Component({
  selector: 'app-breadcrumb-steps',
  standalone: true,
  imports: [],
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
