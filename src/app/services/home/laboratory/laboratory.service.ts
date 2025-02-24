import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LABORATORY_URL } from '../../../helpers/constants/Api';
import { BaseService } from '../../base.service';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root',

})
export class LaboratoryService extends BaseService {

  constructor(http :HttpClient ) {
    super(http, LABORATORY_URL)
   }
}
