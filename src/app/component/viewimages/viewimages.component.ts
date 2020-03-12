import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../services/apicalls';
import { Buffer } from 'buffer';
import { ImageService } from 'src/app/shared/image.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { error } from 'protractor';


@Component({
  selector: 'app-viewimages',
  templateUrl: './viewimages.component.html',
  styleUrls: ['./viewimages.component.css']
})
export class ViewimagesComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  modalRef: BsModalRef;
  selectedImageUrl : string = '';
  selectedImageName : string = '';
  selectedImageDate : string = '';
  connectionStatus : boolean = false;
  isLoading : boolean = false;
start = 0;
end = 3;

  constructor(private service: ImageService, private modalService: BsModalService) { }
  
  changeEndSlice(){
    this.end = undefined;
  }
  changeEndSliceTopThirty(){
    this.end = 3;
  }
  ngOnInit() {
    this.isLoading = true;
  if(this.service.imageDetailList == undefined || this.service.getImageDetailList == null){
      this.isLoading = false;
      this.imageList = null
      this.rowIndexArray =  null
      console.log('No elements');
    }
     else
    {
    this.service.imageDetailList.snapshotChanges().pipe().subscribe(
      list => {
        this.isLoading = false;
        this.connectionStatus = false;
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length))).keys()).reverse();
      },
      error=>{
        this.isLoading = false;
        this.connectionStatus = true;
        this.imageList = null
        this.rowIndexArray =  null
         console.log(error);
      }
    );
    }
  }
  selectedImage(img,name,date, template: TemplateRef<any>){
    this.selectedImageUrl = img;
    this.selectedImageName = name;
    this.selectedImageDate = date;
    this.modalRef = this.modalService.show(template);
  }
}