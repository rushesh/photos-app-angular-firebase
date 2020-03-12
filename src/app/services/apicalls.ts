import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
constructor(private http: HttpClient) { }  
getAllImages(){
      return this.http.get(
        'http://localhost:3000/images',
        );    
}

getFileUploadURL(){
  // const URL = 'http://localhost:3000/upload';
  const URL = 'https://us-central1-images-901f0.cloudfunctions.net/uploadFile';
  return URL;
}
}