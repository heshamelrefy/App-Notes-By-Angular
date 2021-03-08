import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service'
declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private _AuthService:AuthService,private _Router:Router) {
    if (localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/profile"])
    }
   }
  isClicked:boolean=true;
  responseMassage=""
  isReport=""
  isSuccess:boolean=false
  isBug:boolean=false
  signUp=new FormGroup ({
    "first_name":new FormControl('',[Validators.required,Validators.pattern(/^[[a-z]{3,8}$/)]),
    "last_name":new FormControl('',[Validators.required,Validators.pattern(/^[a-z]{3,8}$/)]),
    "email":new FormControl('',[Validators.required,Validators.email]),
    "age":new FormControl('',[Validators.required]),
    "password":new FormControl('',[Validators.required]),
  })
  FormData()
  {
    this.isClicked=false
    if (this.signUp.valid) {
      this._AuthService.signUp(this.signUp.value).subscribe((data)=>{
    if (data.message=="success") {
      console.log(data);
      this.isClicked=true
      this.isSuccess=true
      this.isBug=false
      this.responseMassage=data.message;
      this.signUp.reset();
    }
    else{
      console.log(data)
      this.isReport=data.errors.email.message
      this.isClicked=true;
        this.isSuccess=false
        this.isBug=true
    }
      })
    }
  
    
  }
  ngOnInit(): void {
    $('#signUp').particleground();
    
  }

}
