import{ Injectable } from'@angular/core';
import { AuthService } from '../app/service/auth.service';

@Injectable({
  providedIn: 'root'
}
  
)
export class GlobalUser {
  public emailid = null;

  constructor(private Auth:AuthService) {}

  setUserLoggedInEmail() {
    this.emailid = localStorage.getItem('useremail');
    // console.log(this.emailid);
  }

  getUserLoggedIn() {
    const email = localStorage.getItem('useremail');
    return email;
  }

}