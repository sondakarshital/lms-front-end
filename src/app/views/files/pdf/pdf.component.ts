import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../service/fileupload-service/fileUpload.service'
import {FileDetails} from '../../../domain/file-details'
import {saveAs as importedSaveAs} from "file-saver";
import { map } from 'rxjs/operators';
import { AppGlobals} from '../../../service/global'

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  files: string[] = [];
  pdfSrc = "https://storage.cloud.google.com/lms-upload-files/Unit-1.pdf";
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
  constructor(private uploadService: FileUploadService,private appGlobals : AppGlobals) {
    this.loadFiles(this.maxSize,1);
    this.imageurl = "../../../../assets/nodata.jpg"
  }
  ngOnInit() {
  }

  fileName(file,event) {
    this.files.push(event.target.files[0]);
    this.fileNames.push(event.target.files[0].name);
  };
  loadFiles(size,page){
    if(this.appGlobals.profile.role =="admin") this.isAdmin = true;
    this.uploadService.getPdf(size,page).subscribe(response=>{
      console.log("got all files");
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
