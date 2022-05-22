import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class UserGuardService implements CanActivate { 
  constructor() {};

  canActivate() {
    let role = localStorage.getItem('role');
    if (!role) {
        return false;
    }
    if (role == "USER") {
        return true;
    }
    return false;
  }
}