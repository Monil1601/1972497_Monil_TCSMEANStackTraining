import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  reg = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    username: new FormControl(),
    pass: new FormControl()
  });
  msg:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  addUser(){
    this.saveSession();
  }

  saveSession(){
    let key = this.reg.value.username;
    if(sessionStorage.getItem(key)){
      this.msg = "Choose a different username";
    }else{
      sessionStorage.setItem(key, JSON.stringify(this.reg.value));
      this.msg = "Successful Registration";
      this.reg.reset();
    }
  }

}
