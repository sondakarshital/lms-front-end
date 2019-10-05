import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      data: {
        title: 'Upload'
      },
      children: [
        {
          path: '',
          component: UploadComponent,
          data: {
            title: 'Upload'
          }
        }
      ]
    }
    
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class UploadRoutingModule { }
