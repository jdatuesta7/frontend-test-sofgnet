import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateSchedule } from 'src/app/models/schedules/CreateSchedule';
import { EventsService } from 'src/app/services/events.service';
import { SchedulesService } from 'src/app/services/schedules.service';

declare var iziToast: any;

@Component({
  selector: 'app-schedules-create',
  templateUrl: './schedules-create.component.html',
  styleUrls: ['./schedules-create.component.css']
})
export class SchedulesCreateComponent implements OnInit {

  route_id!: number;
  week_num!: number;
  from!: Date;
  to!: Date;

  token: string = this._cookieService.get('token');

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _schedulesService: SchedulesService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { 
    this._activatedRoute.params.subscribe(params => {
      this.route_id = params['route'];
    });
  }

  ngOnInit(): void {
  }

  createSchedule(formCreate:any) {
    if (formCreate.valid) {

      const schedule: CreateSchedule = {
        route_id: this.route_id,
        week_num: this.week_num,
        from: this.from,
        to: this.to
      }

      this._schedulesService.addSchedule(this.token, schedule).subscribe(
        response => {
          iziToast.success({
            title: 'Ok',
            message: 'Horario creado correctamente',
            position: 'topRight'
          });

          this._eventsService.refreshSchedules();
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        }
      )
    }else {
      iziToast.error({
        title: 'Error',
        message: 'Formulario invalido',
        position: 'topRight'
      });
    }
  }

}
