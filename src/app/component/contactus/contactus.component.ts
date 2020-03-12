import { Component,  TemplateRef, ViewChild, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { config } from 'rxjs';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  config = {
    show:true,
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
}
