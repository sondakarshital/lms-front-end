import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      data: {
        title: 'Profile'
      },
      children: [
        {
          path: '',
          component: ProfileComponent,
          data: {
            title: 'Profile'
          }
        }
      ]
    }
    
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProfileRoutingModule { }
