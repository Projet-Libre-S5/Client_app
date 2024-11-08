import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient } from '@angular/common/http';





export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),MessageService,provideAnimations(),provideHttpClient()]
};
