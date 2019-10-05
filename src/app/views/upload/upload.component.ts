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
  constructor(private uploadService: FileUploadService) {
    this.loadFiles();
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
      formData.append('fileupload', file);
    });
    this.uploadService.uploadFile(formData).subscribe((data) => {
      this.uploadProgress = data.message;
      if(data.message==100) {
        this.progress = false;
        this.loadFiles();
        this.fileNames = null;
      }
    }, (err) => {
      console.log("error occured");
    })
  };

  loadFiles(){
    this.uploadService.getUploadedFiles().subscribe(files=>{
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
      this.loadFiles();
    },err=>{
      console.log("error occured while deleting file");
    })
  }
}
