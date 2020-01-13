import { NgModule } from '@angular/core';
import { FilesComponent } from './files.component';
import {DownloadComponent} from './download/download.component'
import { Routes, RouterModule } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { PicturesComponent } from './pictures/pictures.component';
import { OthersComponent } from './others/others.component';


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
        },
        {
          path: 'pdf',
          component: PdfComponent,
          data: {
            title: 'Pdf'
          }
        },
        {
          path: 'pictures',
          component: PicturesComponent,
          data: {
            title: 'Pictures'
          }
        },
        {
          path: 'others',
          component: OthersComponent,
          data: {
            title: 'Others'
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
