import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),MessageService ]

    });
   // service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });
});
