import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $:any
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { 
    if (localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/profile"])
    }
  }

  signIn= new FormGroup({
    "email":new FormControl('',[Validators.required,Validators.email]),
    "password":new FormControl('',[Validators.required])
  })
  token
  inccorectPassword=""
  logOut:boolean=false
  FormData()
  {
    if (this.signIn.valid) {
      
      this._AuthService.signIn(this.signIn.value).subscribe((res)=>{
        this.token=res.token
       
        this.inccorectPassword=res.message
        if (res.message=="success") {
          this.logOut=true
          this._Router.navigate(["/profile"]);
          localStorage.setItem("TOKEN", res.token);
        }
        
        
      })
      
    }
  }
 
  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
