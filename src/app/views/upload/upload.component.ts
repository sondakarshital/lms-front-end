import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../service/fileupload-service/fileUpload.service'
import {FileDetails} from '../../domain/file-details'
import {saveAs as importedSaveAs} from "file-saver";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files: string[] = [];
  fileNames = [];
  fileDetails : FileDetails;
  uploadProgress =0;
  progress = false;
  //pagination related variables
  totalItems: number = 64;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  maxSize: number = 3;
  constructor(private uploadService: FileUploadService) {
    this.loadFiles(this.maxSize,1);
  }
  ngOnInit() {
  }

  fileName(file) {
    this.files.push(file[0]);
    this.fileNames.push(file[0].name);
  };

  uploadFile() {
    this.progress = true;
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('upload', file);
    });
    this.uploadService.uploadFile(formData).subscribe((data) => {
      this.uploadProgress = data.message;
      if(data.message==100) {
        this.progress = false;
        this.loadFiles(this.maxSize,1);
        this.fileNames = null;
      }
    }, (err) => {
      console.log("error occured");
    })
  };

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
      this.loadFiles(this.maxSize,1);
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
