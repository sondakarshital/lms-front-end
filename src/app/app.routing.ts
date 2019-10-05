import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ProfileComponent } from './views/profile/profile.component';
import {ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },{
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },{
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: 'password-reset',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGaurdService]
      },
      {
        path: 'upload',
        loadChildren: () => import('./views/upload/upload.module').then(m => m.UploadModule), canActivate: [AuthGaurdService]
      },
      {
        path: 'files',
        loadChildren: () => import('./views/files/files.module').then(m => m.FilesModule), canActivate: [AuthGaurdService]
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGaurdService]
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
