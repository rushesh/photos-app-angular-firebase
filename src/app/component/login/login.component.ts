import { Component, OnInit } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { GlobalUser } from 'src/app/globaluser';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  
  constructor(private router: Router,private formBuilder: FormBuilder, private Auth:AuthService, private user: GlobalUser) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        emailid: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      }, {
          
      });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }
else{
   let user_det = new Object ({
        emailid : this.loginForm.value.emailid,
        password:this.loginForm.value.password
    });
    const login_emailid =  this.loginForm.value.emailid;
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      let data = this.Auth.logincheck(user_det);
      console.log('User login status : ',data);
      this.Auth.storeUserData(user_det);
          if(data){
            this.user.setUserLoggedInEmail();
            Swal.fire({
                    icon: 'success',
                    title: 'Login in Successfully',
                    text: 'You are automatically redirected to Home Page',
                    footer: 'Photos-App@2020'
                  });
                  this.router.navigate(['./images']);
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Login in failed',
              text: 'Please try again',
              footer: 'Photos-App@2020'
            });
            this.router.navigate(['/login']);
          }
  }
  }
  onReset() {
      this.submitted = false;
      this.loginForm.reset();
  }


}
