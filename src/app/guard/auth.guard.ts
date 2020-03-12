import { Injectable }  from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private Auth: AuthService, private router:Router){}

    canActivate(){
        // console.log('In can Activate');
        if(this.Auth.loggedin()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}

