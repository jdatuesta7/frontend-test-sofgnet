import { CreateDriver } from 'src/app/models/drivers/createDriver';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DriversService } from 'src/app/services/drivers.service';
import { EventsService } from 'src/app/services/events.service';

declare var iziToast: any;

@Component({
  selector: 'app-drivers-create',
  templateUrl: './drivers-create.component.html',
  styleUrls: ['./drivers-create.component.css']
})
export class DriversCreateComponent implements OnInit {
  @ViewChild('asBtnClose') btnCloseModal: ElementRef|any;

  first_name: string = '';
  last_name: string = '';
  ssd: string = '';
  dob: any;
  address: string = '';
  city: string = '';
  zip: string = '';
  phone: string = '';

  token: string = this._cookieService.get('token');

  constructor(
    private _driversService: DriversService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { 
  }

  ngOnInit(): void {
  }

  createDriver(formCreate:any) {
    if (formCreate.valid) {
      const driver: CreateDriver = {
        first_name: this.first_name,
        last_name: this.last_name,
        ssd: this.ssd,
        dob: this.dob,
        address: this.address,
        city: this.city,
        zip: this.zip,
        phone: this.phone
      }

      this._driversService.addDriver(this.token, driver).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Conductor creado correctamente',
            position: 'topRight'
          });
          
          this.btnCloseModal.nativeElement.click();
          this._eventsService.refreshDriversList('create');
        }, 
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        });
    }
  }
}
