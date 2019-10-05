import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


// Buttons Routing
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UploadComponent } from './upload.component';
import {UploadRoutingModule} from './upload.routing'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHttpInterceptorService } from '../../service/basic-auth-http-interceptor.service';


// Angular

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    UploadRoutingModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [
    UploadComponent
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true 
  }]
})
export class UploadModule { }
