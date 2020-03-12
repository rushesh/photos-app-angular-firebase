import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any>;

  constructor(private toastr: ToastrService,private firebase: AngularFireDatabase, private http: HttpClient) { }

  getImageDetailList() {
    try {
      this.imageDetailList =  this.firebase.list('imageDetails', ref=> ref.orderByChild('imageUserName').equalTo('admin'));
    } catch (error) {
      console.log(error);
      this.imageDetailList = null;
      
      this.toastr.warning('Failed connection to firebase', 'DB Connect Error', {
        timeOut: 4000
      });
    }
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
    this.toastr.success(imageDetails.imageName, 'Image Uploaded', {
      timeOut: 2000
    });
  }
}