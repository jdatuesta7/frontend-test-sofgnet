import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Auth } from '../models/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url;

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {
    this.url = GLOBAL.url + 'auth/';
  }

  register(user: User): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'register', user, { headers: headers });
  }

  login(user: Auth): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', user, { headers: headers });
  }

  isAuthenticated(): boolean {
    if (!this._cookieService.check('token')) {
      return false;
    }

    const token = this._cookieService.get('token');

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);
      
      if(helper.isTokenExpired(token)){
        this._cookieService.deleteAll();
        return false;
      }

      if (!decodedToken) {
        this._cookieService.deleteAll();
        return false;
      }

    } catch (error) {
      console.log(error);
      this._cookieService.deleteAll();
      return false;
    }

    return true;
  }

}
