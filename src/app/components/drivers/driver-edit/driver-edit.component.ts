import { UpdateDriver } from 'src/app/models/drivers/UpdateDriver';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { DriversService } from 'src/app/services/drivers.service';
import { CookieService } from 'ngx-cookie-service';

declare var iziToast: any;

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  id!: number;
  first_name!: string;
  last_name!: string;
  ssd!: string;
  dob!: any;
  address!: string;
  city!: string;
  zip!: string;
  phone!: string;

  token: string = this._cookieService.get('token');

  constructor(
    private _eventsService: EventsService,
    private _driverService: DriversService,
    private _cookieService: CookieService
  ) {
    this._eventsService.$getDriver.subscribe((driver) => {
      this.id = driver.id;
      this.first_name = driver.first_name;
      this.last_name = driver.last_name;
      this.ssd = driver.ssd;
      this.dob = driver.dob;
      this.address = driver.address;
      this.zip = driver.zip;
      this.city = driver.city;
      this.phone = driver.phone;
    })
  }

  ngOnInit(): void {
  }

  updateDriver(formCreate: any) {
    if (formCreate.valid) {
      const driver: UpdateDriver = {
        id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        ssd: this.ssd,
        dob: this.dob,
        address: this.address,
        city: this.city,
        zip: this.zip,
        phone: this.phone
      }

      this._driverService.updateDriver(this.token, driver).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Conductor actualizado correctamente',
            position: 'topRight'
          });
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Formulario invalido',
        position: 'topRight'
      });
    }

    
    this._eventsService.refreshDriversList('edit');
  }
}
