import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateVehicle } from 'src/app/models/vehicles/UpdateVehicle';
import { EventsService } from 'src/app/services/events.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare var iziToast: any;

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.component.html',
  styleUrls: ['./vehicles-edit.component.css']
})
export class VehiclesEditComponent implements OnInit {

  id!: number;
  make!: string;
  year!: number;
  capacity!: number;
  description!: string;

  token: string = this._cookieService.get('token');

  constructor(
    private _cookieService: CookieService,
    private _vehicleService: VehiclesService,
    private _eventsService: EventsService
  ) { 
    this._eventsService.$getVehicles.subscribe((vehicle) => {
      this.id = vehicle.id;
      this.make = vehicle.make;
      this.year = vehicle.year;
      this.capacity = vehicle.capacity;
      this.description = vehicle.description;
    })
  }

  ngOnInit(): void {
  }

  updateVehicle(formEdit:any){
    if (formEdit.valid) {
      const vehicle: UpdateVehicle = {
        id: this.id,
        description: this.description,
        capacity: this.capacity,
        make: this.make,
        year: this.year
      }

      console.log(vehicle);

      this._vehicleService.updateVehicle(this.token, vehicle).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Vehiculo actualizado correctamente',
            position: 'topRight'
          });
          this._eventsService.refreshVehiclesList('edit');
        }, 
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        })
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Formulario invalido',
        position: 'topRight'
      });
    }
  }

}
