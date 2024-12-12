import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  selectedLanguage: string = 'fr';
  constructor(private router: Router,private translate: TranslateService) {
    this.translate.setDefaultLang(localStorage.getItem('lang')||'fr');
    this.selectedLanguage = localStorage.getItem('lang') || 'fr'

  }


  updatePlaceholder() {
    if (this.selectedLanguage === 'fr') {
      this.switchLanguage('fr')
      localStorage.setItem('lang', 'fr'); 
    } else if (this.selectedLanguage === 'en') {
      this.switchLanguage('en')
      localStorage.setItem('lang', 'en'); 
    } else  {
      this.switchLanguage('ar')
      localStorage.setItem('lang', 'ar'); 
    }
  }

  switchLanguage(language: string) {
      this.translate.use(language);
  }

}
