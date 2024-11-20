// sweetalert.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessAlert(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'text-black shadow-md rounded-2xl font-chillax border'
      }
    });
  }

  showErrorAlert(title: string, errorMessage: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: errorMessage,
      showConfirmButton: false,
      timer: 6000,
      customClass: {
        popup: 'text-black shadow-md rounded-2xl font-chillax border'
      }
    });
  }
}
