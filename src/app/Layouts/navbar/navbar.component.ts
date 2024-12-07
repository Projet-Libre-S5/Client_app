import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  searchTerm: string = '';

  sections = [
    { id: 'section1', name: 'Section 1' },
    { id: 'section2', name: 'Section 2' },
    { id: 'section3', name: 'Section 3' }
  ];

  constructor(private router: Router) {}

  navigateToSection(): void {
    const section = this.sections.find(s => s.name.toLowerCase() === this.searchTerm.toLowerCase());
    if (section) {
      this.router.navigate([section.id]);
    } else {
      alert('Section not found!');
    }
  }
}
