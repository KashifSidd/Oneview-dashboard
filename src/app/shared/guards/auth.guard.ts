import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  currentUrl: string;
  orderId: string;
  service: string;
  constructor(private router: Router) {}

 canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    this.currentUrl = state.url;
    if (this.currentUrl.split('?')[0] === '/home') { //for deep linking
      this.orderId = next.queryParams.orderId;
      this.service = next.queryParams.service;
    }
    const token = localStorage.getItem('token');
    if (!token && this.currentUrl !== '/login') {
      this.router.navigate(['login'], {state: {service: this.service, orderId: this.orderId}});
      return false;
    }
    else if (token && this.currentUrl === '/login' || this.currentUrl === '/') {
      this.router.navigate(['home']);
      return false;
    }


     return true;
  }
}
