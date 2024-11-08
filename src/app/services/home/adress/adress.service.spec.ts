import { TestBed } from '@angular/core/testing';

import { AdressService } from './adress.service';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';



describe('AdressService', () => {
  let service: AdressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),MessageService ]

    });
    service = TestBed.inject(AdressService);
  });

  it('should be created', () => {
   // expect(service).toBeTruthy();
  });
});
