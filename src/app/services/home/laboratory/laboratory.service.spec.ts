import { TestBed } from '@angular/core/testing';

import { LaboratoryService } from './laboratory.service';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('LaboratoryService', () => {
  let service: LaboratoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),MessageService ]
    });
    service = TestBed.inject(LaboratoryService);
  });

  it('should be created', () => {
   // expect(service).toBeTruthy();
  });
});
