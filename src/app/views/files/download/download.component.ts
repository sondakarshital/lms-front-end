import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../service/fileupload-service/fileUpload.service'
import {FileDetails} from '../../../domain/file-details'
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  fileDetails : FileDetails;
  //pagination related variables
  totalItems: number = 64;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  maxSize: number = 5;
  constructor(private uploadService: FileUploadService) { 
    this.loadFiles(this.maxSize,1);
  }

  ngOnInit() {
  }

  loadFiles(size,page){
    this.uploadService.getFiles(size,page).subscribe(files=>{
      this.fileDetails = files;
    },error=>{
      console.log("error occured while fetching files");
    })
  };
  download(filename){
    this.uploadService.downloadFile(filename).subscribe(file=>{
      importedSaveAs(file, filename);
    },error=>{
      console.log("error occured while fetching files",error);
    })
  };

  delete(filename){
    this.uploadService.deleteFile(filename).subscribe(file=>{
      console.log("file is deleted");
      this.loadFiles(null,null);
    },err=>{
      console.log("error occured while deleting file");
    })
  }
  
  //pagination
  pageChanged(event: any): void {
    console.log('Page No ' + event.page);
    this.loadFiles(this.maxSize,event.page);
  }
}
