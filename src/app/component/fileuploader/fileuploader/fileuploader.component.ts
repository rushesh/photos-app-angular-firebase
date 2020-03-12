import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/apicalls';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

// cosnt URL = 'http://localhost:3000/upload'

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: this.apiService.getFileUploadURL().toString(),
    itemAlias: 'image'
  });

  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  selectedFile: File= null;
  
  constructor(private http:HttpClient, private toastr: ToastrService, private apiService:ApiService, private router:Router) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      // console.log('Uploaded File Details:', item,status);
      if(item.status===500)
      this.toastr.warning('File upload Failed!');
      else
      this.toastr.success('File successfully uploaded!\nImage Name : '+item.file.name);
    };
    this.uploader.clearQueue();
  }
}