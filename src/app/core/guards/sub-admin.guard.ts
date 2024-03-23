import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User_Role } from 'src/app/share/enums/userRoles';

@Injectable({
  providedIn: 'root'
})
export class SubAdminGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this._authService.isAuthenticated();
      const user = this._authService.getUserProfile();
        if(isAuthenticated && user.role.code === User_Role.SUB_ADMIN){
          return true;
        }  
        
        this._router.navigate([''])
        return false;
        // return true;
  }
  
}