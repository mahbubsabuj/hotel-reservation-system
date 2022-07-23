import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { LocalStorageService } from '@client/utils';
import { Observable } from 'rxjs';
import { AuthInfo } from '../models/auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(): //  route: ActivatedRouteSnapshot,
  //state: RouterStateSnapshot

  | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();
    console.log(token);
    if (token !== '') {
      const decoded: AuthInfo = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded);
      if (decoded.isAdmin && !this._isTokenExpired(decoded.exp)) {
        return true;
      }
    }
    this.router.navigateByUrl('/login');
    return false;
  }
  private _isTokenExpired(exp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
}