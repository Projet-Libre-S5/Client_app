import { Component } from '@angular/core';
import { Papa } from "ngx-papaparse";
import {TableModule} from "primeng/table";
import {StyleClassModule} from "primeng/styleclass";
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from "primeng/api";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlertService } from '../../../../shared/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    StyleClassModule,
    RouterModule,
    SharedModule,
    PaginatorModule,
    TranslateModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roles = [
    {
      name: 'admin',
      permissions: {
        addUser: true,
        modifyData: true,
        deleteUserOrData: true,
        exportReports: true,
      },
    },
    {
      name: 'employe',
      permissions: {
        addUser: false,
        modifyData: true,
        deleteUserOrData: false,
        exportReports: true,
      },
    },
    {
      name: 'patient',
      permissions: {
        addUser: false,
        modifyData: false,
        deleteUserOrData: false,
        exportReports: false,
      },
    },
  ];
}
