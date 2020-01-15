import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../service/fileupload-service/fileUpload.service'
import {FileDetails} from '../../domain/file-details'
import {saveAs as importedSaveAs} from "file-saver";
import { map } from 'rxjs/operators';
import { AppGlobals} from '../../service/global'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files: string[] = [];
  imageurl;
  isAdmin = false;
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
  totalItems: number = 10;
  bigTotalItems: number = 100;
  bigCurrentPage: number = 1;
  maxSize: number = 3;
  searchValue;
  constructor(private uploadService: FileUploadService,private appGlobals : AppGlobals) {
    this.loadFiles(this.maxSize,1,this.searchValue);
    console.log("appGlobals ",appGlobals);
    this.imageurl = "../../../assets/nodata.jpg"
  }
  ngOnInit() {
  }

  fileName(file,event) {
    this.files.push(event.target.files[0]);
    this.fileNames.push(event.target.files[0].name);
  };

  uploadFile() {
    this.progress = true;
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('upload', file);
    });
    this.uploadService.uploadFile(formData).subscribe((data) => {
      this.uploadProgress = data.message;
      console.log("data ",data);
      if(data.filePath) {
        this.progress = false;
        this.loadFiles(this.maxSize,1,this.searchValue);
        this.fileNames = [];
        this.files = [];
      }
    }, (err) => {
      console.log("error occured");
    })
  };

  loadFiles(size,page,searchValue){
    if(this.appGlobals.profile.role =="admin") this.isAdmin = true;
    this.uploadService.getFiles(size,page,searchValue).subscribe(response=>{
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
      this.loadFiles(this.maxSize,1,this.searchValue);
    },err=>{
      console.log("error occured while deleting file");
    })
  }
  //pagination
  pageChanged(event: any): void {
    console.log('Page No ' + event.page);
    this.loadFiles(this.maxSize,event.page,this.searchValue);
  }
  //function to disable the download and the delete button
  setClickedRow (index){
    this.selectedRow = index;
}
}
