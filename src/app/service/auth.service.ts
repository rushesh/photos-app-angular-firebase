import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken :any;
user:any;

  constructor(private http: HttpClient) { }

  logincheck(user){
    let emailid:string = user.emailid;
    let password: string = user.password;

    if(emailid.toLowerCase() == 'admin123@photosapp.org' && password == 'Admin@1234'){
      this.storeUserData(user.emailid);
      console.log('User logged in');
      return true;
  }
  else{
    return false;
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
        // console.log(data);
        localStorage.setItem('id_token',data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        // console.log("User Email"+data.emailid);
        localStorage.setItem('useremail',data.emailid);
        this.authToken=data.token;
        this.user=data.user;
        } 
      }

    }

