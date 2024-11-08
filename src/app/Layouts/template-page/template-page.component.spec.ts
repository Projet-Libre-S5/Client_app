import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplatePageComponent } from './template-page.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';


describe('TemplatePageComponent', () => {
  let component: TemplatePageComponent;
  let fixture: ComponentFixture<TemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePageComponent],
      providers: [provideHttpClient(),MessageService,provideRouter([]) ]
    

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
