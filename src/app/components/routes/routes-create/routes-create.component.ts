import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateDriver } from 'src/app/models/drivers/UpdateDriver';
import { CreateRoute } from 'src/app/models/routes/CreateRoute';
import { UpdateVehicle } from 'src/app/models/vehicles/UpdateVehicle';
import { DriversService } from 'src/app/services/drivers.service';
import { EventsService } from 'src/app/services/events.service';
import { RoutesService } from 'src/app/services/routes.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare var iziToast: any;

@Component({
  selector: 'app-routes-create',
  templateUrl: './routes-create.component.html',
  styleUrls: ['./routes-create.component.css']
})
export class RoutesCreateComponent implements OnInit {
  @ViewChild('asBtnClose') btnCloseModal: ElementRef|any;

  driver_id: number = 0;
  vehicle_id: number = 0;
  description!: string;

  drivers: Array<UpdateDriver> = [];
  vehicles: Array<UpdateVehicle> = [];

  token: string = this._cookieService.get('token');

  constructor(
    private _driversService: DriversService,
    private _vehicleService: VehiclesService,
    private _cookieService: CookieService,
    private _routeService: RoutesService,
    private _eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.getDrivers();
    this.getVehicles();
  }

  getDrivers(){
    this._driversService.getDrivers(this.token).subscribe(
      response => {
        this.drivers = response;
      }, 
      error => {
        console.log(error);
      })
  }

  getVehicles(){
    this._vehicleService.getVehicles(this.token).subscribe(
      response => {
        this.vehicles = response;
      }, 
      error => {
        console.log(error);
      })
  }

  createRoute(formCreate:any){
    if (formCreate.valid) {
      const route: CreateRoute = {
        description: this.description,
        driver_id: this.driver_id,
        vehicle_id: this.vehicle_id
      }

      this._routeService.addRoute(this.token, route).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Ruta creada correctamente',
            position: 'topRight'
          });
          this.btnCloseModal.nativeElement.click();
          this._eventsService.refreshRoutesList('create');
        }, 
        error => {
          console.log(error);
        });
    }else{
      iziToast.error({
        title: 'Error',
        message: 'Formulario invalido',
        position: 'topRight'
      });
    }
  }



}
