import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any>;

  constructor(private authSerive: AuthService,private toastr: ToastrService,private firebase: AngularFireDatabase, private http: HttpClient) { }

  getImageDetailList(startSize,endsize) {
    try {
      let loggedInUser = this.authSerive.getLoggerinUser();
      loggedInUser = loggedInUser.toString().trim();
      if(endsize!=null){
        // console.log('Fetching');
        return this.imageDetailList =  this.firebase.list('imageDetails', ref=> ref.orderByChild('imageUserName').equalTo(loggedInUser).limitToLast(endsize));
      }
      else if(
        endsize == null
      ){
        return this.imageDetailList =  this.firebase.list('imageDetails', ref=> ref.orderByChild('imageUserName').equalTo(loggedInUser));
      }
    } catch (error) {
      // console.log(error);
      this.imageDetailList = null;
      return this.imageDetailList;
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