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
  imageurl;
  fileNames = [];
  fileDetails : FileDetails;
  uploadProgress =0;
  progress = false;
  deleteDisabledButton = false;
  deleteDisabledSpinner = true;

  downloadDisabledButton = false;
  downloadDisabledSpinner = true;
  selectedRow;
  //pagination related variables
  totalItems: number = 64;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  maxSize: number = 3;
  constructor(private uploadService: FileUploadService) {
    this.loadFiles(this.maxSize,1);
    this.imageurl = "../../../assets/nodata.jpg"
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
    console.log("this.files ",this.files)
    this.files.forEach(file => {
      formData.append('upload', file);
    });
    this.uploadService.uploadFile(formData).subscribe((data) => {
      this.uploadProgress = data.message;
      console.log("data ",data);
      if(data.filePath) {
        console.log("upload 100");
        this.progress = false;
        this.loadFiles(this.maxSize,1);
        this.fileNames = null;
      }
    }, (err) => {
      console.log("error occured");
    })
  };

  loadFiles(size,page){
    this.uploadService.getFiles(size,page).subscribe(response=>{
      console.log("files ",response);
      this.fileDetails = response;
    },error=>{
      console.log("error occured while fetching files");
    })
  };

  download(filename){
    this.downloadDisabledButton = true;
    this.downloadDisabledSpinner = false;
    this.uploadService.downloadFile(filename).subscribe(file=>{
      importedSaveAs(file, filename);
      this.downloadDisabledButton = false;
      this.downloadDisabledSpinner = true;
    },error=>{
      console.log("error occured while fetching files",error);
    })
  };
  delete(filename){
    this.deleteDisabledButton = true;
    this.deleteDisabledSpinner = false;
    this.uploadService.deleteFile(filename).subscribe(file=>{
      console.log("file is deleted");
      this.deleteDisabledButton = false;
      this.deleteDisabledSpinner = true;
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
  //function to disable the download and the delete button
  setClickedRow (index){
    this.selectedRow = index;
}
}
