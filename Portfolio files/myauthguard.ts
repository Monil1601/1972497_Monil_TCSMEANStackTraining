import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class MyAuthGuard implements CanActivate {
    constructor(public router: Router) { }
    canActivate() {
        let obj = sessionStorage.getItem("CurrentUser");
        if (obj != null) {
            return true;
        } else {
            this.router.navigate(["login"]);
            return false;
        }
    }
}