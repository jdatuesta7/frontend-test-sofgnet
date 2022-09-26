import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CreateSchedule } from '../models/schedules/CreateSchedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url + 'schedules';
  }

  addSchedule(token: string, schedule: CreateSchedule): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.post(this.url, schedule, { headers: headers });
  }

  getRouteSchedules(token: string, route: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });
    return this._http.get(this.url + '/' + route, { headers: headers });
  }
}