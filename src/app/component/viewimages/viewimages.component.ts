import { Component, OnInit, TemplateRef, Directive, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../services/apicalls';
import { Buffer } from 'buffer';
import { ImageService } from 'src/app/shared/image.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { Infi } from 'ngx-infinite-scroll';
import { ImageCompressService } from  'ng2-image-compress';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-viewimages',
  
  templateUrl: './viewimages.component.html',
  styleUrls: ['./viewimages.component.css'] 
})
export class ViewimagesComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];

  imageList_copy: any[];
  rowIndexArray_copy: any[];

  imageList_copy_compressed= [];

  modalRef: BsModalRef;
  selectedImageUrl : string = '';
  selectedImageName : string = '';
  selectedImageDate : string = '';
  connectionStatus : boolean = false;
  isLoading : boolean = false;
start = 0;
end = 30;
showGroups = false;
groupedImages = [];
groupedImagesShow = [];
newGroupArray = [];
// fetchSize = 2;


  constructor(@Inject(DOCUMENT) private document: Document,private imgCompressService: ImageCompressService,private service: ImageService, private modalService: BsModalService) { }
  showImageGroups(){
    this.showGroups=!this.showGroups;
  }
  changeEndSlice(){
    // this.end = undefined;
    this.end = null;
    this.getList();

  }
  changeEndSliceTopThirty(){
    this.start=this.end;
    this.end=30;
    this.getList();
  }
  ngOnInit() {
     this.getList();
  }
  selectedImage(img,name,date, template: TemplateRef<any>){
    this.selectedImageUrl = img;
    this.selectedImageName = name;
    this.selectedImageDate = date;
    this.modalRef = this.modalService.show(template);
  }

compressImages(){
  ImageCompressService.filesToCompressedImageSource(this.imageList_copy[0]).then(observableImages => {
    observableImages.subscribe((image) => {
      this.imageList_copy_compressed.push(image);
      // console.log(image);
    }, (error) => {
      // console.log("Error while converting");
    });
  });
}

groupImages(){
  
  const groupBy = (array=this.imageList_copy_compressed, key='imageDate') => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
  this.groupedImages = [];
  this.groupedImagesShow = [];
  this.groupedImages = groupBy();
  // console.log(this.groupedImages);
  
  for( var key in this.groupedImages){
    let myValue = this.groupedImages[key];
// console.log(myValue);
    this.groupedImagesShow.push({key,myValue});
    // myValue.forEach(element => {
    //   this.groupedImagesShow.push({element})
    // });
  }

  }

  getList(){
    this.isLoading = false;
  
    let getImages = this.service.getImageDetailList(this.start,this.end);

  if(getImages == undefined || getImages == null){
      this.isLoading = false;
      this.imageList = null
      this.rowIndexArray =  null
      
      this.imageList_copy = this.imageList;
      this.rowIndexArray_copy=this.rowIndexArray;


      // console.log('No elements');
    }
     else
    {
      // this.isLoading = true;
      getImages.snapshotChanges().pipe().subscribe(
      list => {
        this.isLoading = false;
        this.connectionStatus = false;
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length))).keys()).reverse();

        
      this.imageList_copy = this.imageList;
      this.rowIndexArray_copy=this.rowIndexArray;
      this.imageList_copy_compressed=[];
      for (let index = 0; index < this.rowIndexArray.length; index++) {
        let element = this.imageList_copy[index];
        this.imageList_copy_compressed.push(element);
      }
      // console.log(this.imageList_copy_compressed);
      if(this.imageList_copy_compressed.length>0)
      {
      this.groupImages();
      }
      else
      {
        this.groupedImagesShow = null;
        this.rowIndexArray_copy = [];
      }
      },

      error=>{
        this.isLoading = false;
        this.connectionStatus = true;
        this.imageList = null
        this.rowIndexArray =  null
        //  console.log(error);
      }
    );
    }
  }
  onScrollDown() {
    // console.log('scrolled down!!');
    this.start=this.end;
    this.end+=2;
    this.getList();
  }
  onScrollUp() {
    // console.log('scrolled up!!');
    }
    scrollToTop(){
      window.scrollTo(0,0);
    }
}