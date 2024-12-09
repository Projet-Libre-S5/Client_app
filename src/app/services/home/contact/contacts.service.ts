import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { CONTACT_URL } from '../../../helpers/constants/Api';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactsService extends BaseService {

  constructor(http :HttpClient ) {
    super(http, CONTACT_URL)
   }
}
