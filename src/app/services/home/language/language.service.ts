import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private langSubject: BehaviorSubject<string>;

  constructor() {
    const initialLang = localStorage.getItem('lang') || 'en'; // Langue par défaut
    this.langSubject = new BehaviorSubject<string>(initialLang);
  }

  // Observable exposé pour écouter les changements
  get lang$(): Observable<string> {
    return this.langSubject.asObservable();
  }

  // Modifie la langue et notifie les abonnés
  setLang(lang: string): void {
    localStorage.setItem('lang', lang);
    this.langSubject.next(lang);
  }
}
