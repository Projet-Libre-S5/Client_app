import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient, @Inject(String) private url: string) { }



  getById<T>(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.url}/${id}`);
  }
  
  getAll<T>(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.url}`);
  }
 

  create<T>(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.url}`, item);
  }

  update<T>(id: number | string, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.url}/${id}`, item);
  }

  delete<T>(id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${this.url}/${id}`);
  }
}
