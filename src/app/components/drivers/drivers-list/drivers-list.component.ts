import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateDriver } from 'src/app/models/drivers/updateDriver';
import { DriversService } from 'src/app/services/drivers.service';
import { EventsService } from 'src/app/services/events.service';

declare var iziToast: any;

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnInit {
  @ViewChild('asBtnEditModal') btnEditModal: ElementRef|any;

  drivers: Array<UpdateDriver> = [];
  token: string = "";

  constructor(
    private _driversService: DriversService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
    ) { 
    this.token = this._cookieService.get('token');

    this._eventsService.$refreshDrivers.subscribe((from) => {
      this.getDrivers();

      if (from === "edit") {
        this.openCloseModal();
      }
    });
  }

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this._driversService.getDrivers(this.token).subscribe(
      response => {
        this.drivers = response;
      }, 
      error => {
        console.log(error);
      })
  }

  removeDriver(id: number) {
    if (confirm('¿ Eliminar Conductor ?')) {
      this._driversService.removeDriver(this.token, id).subscribe(
        response => {
          console.log(response);
          this.getDrivers();
          iziToast.success({
            title: 'Ok',
            message: 'Conductor eliminado correctamente',
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
    }
  }

  editDriver(driver: UpdateDriver){
    this.openCloseModal();
    this._eventsService.getDriver(driver);
  }

  openCloseModal() {
    this.btnEditModal.nativeElement.click();
  }

}
