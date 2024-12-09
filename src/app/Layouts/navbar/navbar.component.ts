import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  selectedLanguage: string = 'fr';
  constructor(private router: Router,private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.selectedLanguage = translate.currentLang || 'fr'

  }


  updatePlaceholder() {
    if (this.selectedLanguage === 'fr') {
      this.switchLanguage('fr')
    } else {
      this.switchLanguage('en')
    }
  }

  switchLanguage(language: string) {
      this.translate.use(language);
  }

}
