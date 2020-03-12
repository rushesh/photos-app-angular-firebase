import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private Auth:AuthService) { }

  ngOnInit() {
  }
  LogOutButton(){
this.Auth.onLogOutActivity();
Swal.fire({
              icon: 'success',
              title: 'Logged Out Successfully',
              footer: 'Photos-App@2020'
            });
  this.router.navigate(['./login']);
  return false;
          }

}
