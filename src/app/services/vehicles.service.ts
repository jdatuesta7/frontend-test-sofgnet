import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CreateVehicle } from '../models/vehicles/CreateVehicle';
import { UpdateVehicle } from '../models/vehicles/UpdateVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url + 'vehicles';
  }

  getVehicles(token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.get(this.url, { headers: headers });
  }

  addVehicle(token: string, vehicle: CreateVehicle): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.post(this.url, vehicle, { headers: headers });
  }

  updateVehicle(token: string, vehicle: UpdateVehicle): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.put(this.url + '/' + vehicle.id, vehicle, { headers: headers });
  }

  removeVehicle(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.delete(this.url + '/' + id, { headers: headers });
  }

}