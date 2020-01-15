import { Injectable } from '@angular/core';
import {  HttpClient, HttpEvent, HttpErrorResponse, HttpEventType  } from '@angular/common/http';
import { ResponseContentType,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import {FileDetails} from '../../domain/file-details'
@Injectable({
    providedIn: 'root'
  })
  export class FileUploadService {
  
    private baseUrl = 'http://localhost:3000/uploads';
  
    constructor(private http: HttpClient) { }

    uploadFile(data): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/upload`, data, {
            reportProgress: true,
            observe: 'events'
          }).pipe(map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                const progress = Math.round(100 * event.loaded / event.total);
                return { status: 'progress', message: progress };
              case HttpEventType.Response:
              console.log("here");
                return event.body;
              default:
                return `Unhandled event: ${event.type}`;
            }
          })
          );
      };

      getUploadedFiles():Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files`);
      }
      //with pagination
      getPdf(limit,pageNo):Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files/pdf?limit=${limit}&pageNo=${pageNo}`);
      }
      //with pagination
      getImages(limit,pageNo):Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files/images?limit=${limit}&pageNo=${pageNo}`);
      }
      //with pagination
      getOtherFiles(limit,pageNo):Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files/other-files?limit=${limit}&pageNo=${pageNo}`);
      }
      //with pagination
      getFiles(limit,pageNo,value):Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files?limit=${limit}&pageNo=${pageNo}&term=${value}`);
      }
      //getting video audio files
      getVideoAudioFiles():Observable<FileDetails>{
        return this.http.get<FileDetails>(`${this.baseUrl}/files/video-audio`);
      }
      downloadFile(filename):Observable<any>{
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(`${this.baseUrl}/cloud/file?filename=`+filename,{ responseType: 'blob' as 'json' },);
      }
      deleteFile(filename){
        return this.http.delete(`${this.baseUrl}/cloud/file?filename=`+filename,);
      }

}