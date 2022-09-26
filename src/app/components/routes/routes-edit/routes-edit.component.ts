import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateDriver } from 'src/app/models/drivers/updateDriver';
import { UpdateRoute } from 'src/app/models/routes/UpdateRoute';
import { UpdateVehicle } from 'src/app/models/vehicles/UpdateVehicle';
import { DriversService } from 'src/app/services/drivers.service';
import { EventsService } from 'src/app/services/events.service';
import { RoutesService } from 'src/app/services/routes.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare var iziToast: any;

@Component({
  selector: 'app-routes-edit',
  templateUrl: './routes-edit.component.html',
  styleUrls: ['./routes-edit.component.css']
})
export class RoutesEditComponent implements OnInit {
  id!: number;
  driver_id!: number;
  vehicle_id!: number;
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
  ) { 
    this._eventsService.$getRoutes.subscribe((route) => {
      this.id = route.id;
      this.driver_id = route.driver.id;
      this.vehicle_id = route.vehicle.id;
      this.description = route.description;
    })
  }

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

  updateRoute(formUpdate:any){
    if (formUpdate.valid) {
      const route: UpdateRoute = {
        id: this.id,
        description: this.description,
        driver_id: this.driver_id,
        vehicle_id: this.vehicle_id,
      }

      this._routeService.updateRoute(this.token, route).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Ruta actualizada correctamente',
            position: 'topRight'
          });

          this._eventsService.refreshRoutesList('edit');
        }, 
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        })
    }else{
      iziToast.error({
        title: 'Error',
        message: 'Formulario invalido',
        position: 'topRight'
      });
    }
  }

}
