import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';
import { snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-uploaders',
  templateUrl: './uploaders.component.html',
  styleUrls: ['./uploaders.component.css']
})
export class UploadersComponent implements OnInit {

  constructor(private toastr: ToastrService,private http:HttpClient, private storage: AngularFireStorage, private service: ImageService) { }
// selectedFile: File= null;
imagesArray = [];
pathFolder = 'image';
loading = true;
percentage = 0;
currentUploadingFileName: string;
ngOnInit() {
    this.service.getImageDetailList();
  }
  onFileSelected(event){
  var resultArray = [];

    // console.log('Event : ',event);
     Object.keys(event.target.files).map(function(imgIndex){
      let img = event.target.files[imgIndex];
      resultArray.push(img);
  });
    // console.log('resultArray ',resultArray);
    // this.selectedFile = <File>event.target.files[0];
    this.imagesArray = resultArray;
  }
  onUpload(){
    this.imagesArray.forEach(element => {
      this.currentUploadingFileName=null;
      this.percentage = 0;
// console.log('Images Array : ',this.imagesArray);
let selectedFile : File = element;
var filePath = `image/${selectedFile.name}_${(new Date()).toString}`;
const fileRef = this.storage.ref(filePath);

var storageRef = firebase.storage().ref(filePath);
const task = storageRef.put(selectedFile);
this.percentage = 0;
task.on('state_changed',
      (snapshot: any) => {
        this.percentage = 0;
        this.currentUploadingFileName=selectedFile.name.toUpperCase().toString();
        this.percentage = Math.ceil((task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100);
        //  console.log("% : ",this.percentage);
      },
      (error) => {
        console.error(error);
        this.toastr.error(this.currentUploadingFileName, 'Image Upload Failed', {
          timeOut: 3000
        });
      },
      () =>{
this.storage.upload(filePath, selectedFile).snapshotChanges().pipe(
  
  finalize(() => {

    this.currentUploadingFileName = null;
    fileRef.getDownloadURL().subscribe((url) => {
      let imageDB = {
        imageDateUploaded : (new Date()).toString(),
        imageUrl : url,
        imageName : selectedFile.name,
        imageSize : selectedFile.size,
        imageType : selectedFile.type,
        imageUserName : 'admin'
      }
      this.service.insertImageDetails(imageDB);
    })
    
  })

).subscribe();
    });
    this.percentage=0;
    this.currentUploadingFileName = null;
  });
  }
}
