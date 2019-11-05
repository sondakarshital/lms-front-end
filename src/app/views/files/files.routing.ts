import { NgModule } from '@angular/core';
import { FilesComponent } from './files.component';
import {DownloadComponent} from './download/download.component'
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      data: {
        title: 'Files'
      },
      children: [
        {
          path: '',
          component: FilesComponent,
          data: {
            title: 'Files'
          }
        },
        {
          path: 'download',
          component: DownloadComponent,
          data: {
            title: 'Files'
          }
        }
      ]
    }
    
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FilesRoutingModule { }
