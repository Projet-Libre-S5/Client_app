import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './Layouts/not-found-page/not-found-page.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './cors/guard/auth.guard';
import { ProfileComponent } from './modules/auth/profile/profile.component';
import { LandingPageComponent } from './modules/landing-page/landing-page/landing-page.component';

export const routes: Routes = [  
 
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'accueil',
        component: LandingPageComponent
      },
      {
        path: '',
        component: LandingPageComponent
      },
   
    {
        path: 'dashboard',
        component:  HomeComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
          },
        ],canActivate: [AuthGuard]
      },
      {
        path:'**',
        component:NotFoundPageComponent
      }
   
      
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
