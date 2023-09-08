import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private baseService: BaseServiceService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
      if (this.authService.isLoggedIn()) {
        const userRole = this.baseService.getUserRole()[0]
        if(route.data['role'] && route.data['role'].indexOf(userRole) === -1){
          if(userRole === "SuperAdmin"){
            this.router.navigate(['/super-admin']);
          }
          else if(userRole === "Regulator"){
            this.router.navigate(['/admin']);
          }
          else if(userRole === "StudentFromUP"){
            this.router.navigate(['/claims/manage']);
          }
           return false;
        }
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
