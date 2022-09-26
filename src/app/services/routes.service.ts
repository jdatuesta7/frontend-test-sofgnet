import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CreateRoute } from '../models/routes/CreateRoute';
import { UpdateRoute } from '../models/routes/UpdateRoute';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url + 'routes';
  }

  getRoutes(token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.get(this.url, { headers: headers });
  }

  addRoute(token: string, route: CreateRoute): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.post(this.url, route, { headers: headers });
  }
  
  removeRoute(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.delete(this.url + '/' + id, { headers: headers });
  }

  updateRoute(token: string, route: UpdateRoute): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.put(this.url + '/' + route.id, route, { headers: headers });
  }
}