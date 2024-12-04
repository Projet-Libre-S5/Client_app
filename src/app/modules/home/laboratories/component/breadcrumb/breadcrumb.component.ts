import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import {  Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-steps',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbStepsComponent {
  @Input() step: number = 1;
}