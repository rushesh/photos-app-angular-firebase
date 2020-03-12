import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private router: Router,private Auth: AuthService) { }
  ngOnInit() {
    
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success', 
    },
    buttonsStyling: false
  })
  if(this.Auth.loggedin()){
   
  swalWithBootstrapButtons.fire({
    title: "Ahhhhhhhhhh!\nThis page doesn't exist",
    text: "You will be redirected on click",
    icon: 'info',
    confirmButtonText: 'Go to Images Page',
    allowEscapeKey:false,
    allowOutsideClick:false
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['./images']);
      swalWithBootstrapButtons.fire(
        'Redirected',
        'Welcome to our Images Page',
        'success'
      )
    }
  });
}
else{ 
  swalWithBootstrapButtons.fire({
    title: "Ahhhhhhhhhh!\nThis page doesn't exist",
    text: "You will be redirected on click",
    icon: 'info',
    confirmButtonText: 'Go to Login Page',
    allowEscapeKey:false,
    allowOutsideClick:false
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['./login']);
      swalWithBootstrapButtons.fire(
        'Redirected',
        'Welcome to our login page',
        'success'
      )
    }
  });
}
  }
}
