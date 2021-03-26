import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: string = sessionStorage.getItem("CurrentUser") as string;
  fname:string = "";
  lname:string = "";
  contacts: Array<[string, string]> = new Array();

  dash = new FormGroup({
    name: new FormControl(),
    number: new FormControl()
  })
  constructor(public router: Router) { 
    let userInfo = this.getinfo()
    this.fname = userInfo.fname;
    this.lname = userInfo.lname;
    if(userInfo.contacts) {
      this.contacts = userInfo.contacts;
    }
  }

  ngOnInit(): void {
  }

  add(){
    if(this.dash.value.name !=null && this.dash.value.number !=null){
      this.contacts.push([this.dash.value.name, this.dash.value.number]);
      let userInfo = this.getinfo();
      userInfo.contacts = this.contacts;
      sessionStorage.setItem(this.currentUser, JSON.stringify(userInfo));
      this.dash.reset();
    }
  }

  getinfo(){
    let userInfo = JSON.parse(sessionStorage.getItem(this.currentUser) as string);
    return userInfo;
  }

  logout(){
    sessionStorage.removeItem("CurrentUser");
    this.router.navigate(["login"]);
  }
}
