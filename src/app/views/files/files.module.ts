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
import { FilesComponent } from './files.component';
import {FilesRoutingModule} from './files.routing'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHttpInterceptorService } from '../../service/basic-auth-http-interceptor.service';

//Video player videogular2

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';


// Angular

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    FilesRoutingModule,
    ProgressbarModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    FilesComponent
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true 
  }]
})
export class FilesModule { }
