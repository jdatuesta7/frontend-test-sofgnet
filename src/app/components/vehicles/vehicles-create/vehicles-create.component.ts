import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CreateVehicle } from 'src/app/models/vehicles/CreateVehicle';
import { EventsService } from 'src/app/services/events.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare var iziToast: any;

@Component({
  selector: 'app-vehicles-create',
  templateUrl: './vehicles-create.component.html',
  styleUrls: ['./vehicles-create.component.css']
})
export class VehiclesCreateComponent implements OnInit {
  @ViewChild('asBtnClose') btnCloseModal: ElementRef|any;

  make!: string;
  year!: number;
  capacity!: number;
  description!: string;

  token: string = this._cookieService.get('token');

  constructor(
    private _vehicleService: VehiclesService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

  createVehicle(formCreate:any){
    if (formCreate.valid) {
      const vehicle: CreateVehicle = {
        description: this.description,
        capacity: this.capacity,
        make: this.make,
        year: this.year
      }

      console.log(vehicle)

      this._vehicleService.addVehicle(this.token, vehicle).subscribe(
        response => {
          iziToast.success({
            title: 'Ok',
            message: 'Vehiculo creado correctamente',
            position: 'topRight'
          });

          this.btnCloseModal.nativeElement.click();
          this._eventsService.refreshVehiclesList('create');
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
