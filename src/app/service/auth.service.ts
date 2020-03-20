import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

user:any;
loginDB;
  
constructor(private http: HttpClient) { }

  logincheck(user){
  this.loginDB = environment.loginDB;

  let emailid:string = user.emailid;
  let password: string = user.password;

  
  switch (emailid) {

    case this.loginDB.cred1admin.id:
      if(password == this.loginDB.cred1admin.password)
      {
        this.storeUserData(this.loginDB.cred1admin);      
        return true;
        break;
      }
      else
      {
        return false;
        break;

      }
      case this.loginDB.cred2admin.id:
      if(password == this.loginDB.cred2admin.password)
      {
        this.storeUserData(this.loginDB.cred2admin);      
        return true;
        break;

      }
      else
      {
        return false;
        break;

      }
      case this.loginDB.cred1test.id:
      if(password == this.loginDB.cred1test.password)
      {
        this.storeUserData(this.loginDB.cred1test);      
        return true;
        break;

      }
      else
      {
        return false;
        break;

      }
      case this.loginDB.cred2test.id:
      if(password == this.loginDB.cred2test.password)
      {
        this.storeUserData(this.loginDB.cred2test);      
        return true;
        break;

      }
      else
      {
        return false;
        break;

      }
      default:
        return false;
        break;

  }
  }
      onLogOutActivity(){
        // this.authToken=null;
        this.user=null;
        localStorage.clear();
      }
loggedin(){
  const emailid = localStorage.getItem('useremail');
  if(emailid){
    return true;
  }
  else{
    return false;
  }
}

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:3000/users/register',
      user,
      {headers:headers , responseType : 'json'}
      );
  }
   storeUserData(data){
        if(data){
          console.log(data);
        localStorage.setItem('name',data.name)
        localStorage.setItem('useremail',data.emailid);
        this.user=data.user;
        } 
      }

      getLoggerinUser(){
        if(localStorage.getItem('name')){
          return localStorage.getItem('name');
        }
        else{
          return '';
        }
      }
    }

