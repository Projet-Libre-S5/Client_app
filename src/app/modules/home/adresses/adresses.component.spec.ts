import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesComponent } from './adresses.component';
import { provideHttpClient } from '@angular/common/http';

describe('AdressesComponent', () => {
  let component: AdressesComponent;
  let fixture: ComponentFixture<AdressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdressesComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();
    
    /*fixture = TestBed.createComponent(AdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
