import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { HttpClient } from '@angular/common/http';
import { ACTIVITY_URL } from '../../../helpers/constants/Api';



@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends BaseService{

  constructor(http :HttpClient ) {
    super(http, ACTIVITY_URL)
   }
}
