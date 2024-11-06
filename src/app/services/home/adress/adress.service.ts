import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { HttpClient } from '@angular/common/http';
import { ADRESS_URL } from '../../../helpers/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class AdressService extends BaseService {

  constructor(http :HttpClient ) {
    super(http, ADRESS_URL)
   }
}
