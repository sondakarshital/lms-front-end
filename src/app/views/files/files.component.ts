import { Component, OnInit, ViewChild } from '@angular/core';
import { IMedia } from '../../domain/IMedia'
import { ModalDirective } from 'ngx-bootstrap/modal';
import {FileUploadService} from '../../service/fileupload-service/fileUpload.service';
import {FileDetails} from '../../domain/file-details'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @ViewChild('largeModal', { static: false }) public largeModal: ModalDirective;
  value = "";
  currentIndex;
  selectedFiles: File = null;
  currentItem: IMedia;
  playlist:FileDetails;
  constructor(public fileUploadService : FileUploadService) {
    fileUploadService.getUploadedFiles().subscribe(files=>{
      this.playlist= files;
      console.log("files",this.playlist);
    },err=>{
      console.log("error occured")
    })
  }
  ngOnInit() {

  }
  onFilesSelected(event) {
    this.selectedFiles = <File>event.target.files[0];
  }
}
