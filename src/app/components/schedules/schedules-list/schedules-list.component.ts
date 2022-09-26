import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateSchedule } from 'src/app/models/schedules/CreateSchedule';
import { EventsService } from 'src/app/services/events.service';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {

  route_id!: number;
  token: string = this._cookieService.get('token');
  schedules: Array<CreateSchedule> = [];

  constructor(
    private _scheduleService: SchedulesService,
    private _activatedRoute: ActivatedRoute,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { 
    this._activatedRoute.params.subscribe((params) => {
      this.route_id = params['route'];
    });

    this.getSchedules();

    this._eventsService.$refreshSchedules.subscribe(() => {
      this.getSchedules();
    })
  }

  ngOnInit(): void {
  }

  getSchedules() {
    this._scheduleService.getRouteSchedules(this.token, this.route_id).subscribe(
      response => {
        this.schedules = response;
        console.log(this.schedules);
      }, 
      error => {
        console.log(error);
      });
  }

}
