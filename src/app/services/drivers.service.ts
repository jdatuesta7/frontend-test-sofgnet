import { UpdateDriver } from 'src/app/models/drivers/UpdateDriver';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CreateDriver } from '../models/drivers/CreateDriver';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url + 'drivers';
  }

  getDrivers(token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.get(this.url, { headers: headers });
  }

  addDriver(token: string, driver: CreateDriver): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.post(this.url, driver, { headers: headers });
  }

  removeDriver(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.delete(this.url + '/' + id, { headers: headers });
  }

  updateDriver(token: string, driver: UpdateDriver): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.put(this.url + '/' + driver.id, driver, { headers: headers });
  }
}