import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuardService implements CanActivate { 
  constructor() {};

  canActivate() {
    let role = localStorage.getItem('role');
    if (!role) {
        return false;
    }

    return true;
  }
}