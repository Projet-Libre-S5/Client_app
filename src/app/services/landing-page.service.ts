import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClient) {}


   getAll(){
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=7cc53784c4054c31b8ee25d48508105d`);
  }
}
