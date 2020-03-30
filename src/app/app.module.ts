import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

// import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { ViewimagesComponent } from './component/viewimages/viewimages.component';
// import { FileuploaderComponent } from './component/fileuploader/fileuploader/fileuploader.component';

import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UploadersComponent } from './component/uploaders/uploaders/uploaders.component';


import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';


import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from 'src/environments/environment';

import { ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { LoginComponent } from '../app/component/login/login.component';
import { AppSubComponentComponent } from './component/app-sub-component/app-sub-component.component';
import { AuthGuard } from './guard/auth.guard';

import { NavbarComponent } from '../app/component/navbar/navbar.component';
import { GlobalUser } from './globaluser';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';


import { AboutusComponent } from '../app/component/aboutus/aboutus.component';
import { ContactusComponent } from '../app/component/contactus/contactus.component';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { DragDirective } from './component/uploaders/uploaders/drag.directive';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ImageCompressModule } from 'ng2-image-compress';
@NgModule({
  declarations: [
    AppComponent,
    // FileSelectDirective,
    ViewimagesComponent,
    // FileuploaderComponent,
    UploadersComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,
    LoginComponent,
    AppSubComponentComponent,
    NavbarComponent,
    PagenotfoundComponent,
    AboutusComponent,
    ContactusComponent,
    DragDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
      AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule ,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    ProgressbarModule.forRoot(),
    InfiniteScrollModule,
    ImageCompressModule
  ],
  providers: [AuthGuard, GlobalUser],
  bootstrap: [AppComponent]
})

export class AppModule { }

