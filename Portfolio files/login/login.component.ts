import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log = new FormGroup({
    username: new FormControl(),
    pass: new FormControl()
  })

  msg:string="";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  validate(){
    let user = this.log.value.username;
    let pass = this.log.value.pass;
    let sess: any = sessionStorage.getItem(user);
    if(sess!=null){
      sess = JSON.parse(sess as string);
      let sessP = sess.pass;
      if(pass == sessP){
        sessionStorage.setItem("CurrentUser", user);
        this.router.navigate(["dashboard"]);
      }else{
        this.msg = "Incorrect Password";
      }
    }else{
      this.msg = "Invalid username";
      this.log.reset();
    }
  }

}
