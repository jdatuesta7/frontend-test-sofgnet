import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateVehicle } from 'src/app/models/vehicles/UpdateVehicle';
import { EventsService } from 'src/app/services/events.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare var iziToast: any;

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  @ViewChild('asBtnEditModal') btnEditModal : ElementRef|any;

  token: string;
  vehicles: Array<UpdateVehicle> = [];

  constructor(
    private _vehicleService: VehiclesService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { 
    this.token = this._cookieService.get('token');

    this._eventsService.$refreshVehicles.subscribe((from) => {
      this.getVehicles();

      if (from === "edit") {
        this.openCloseEditModal();
      }
    });
  }

  ngOnInit(): void {
    this.getVehicles();
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

  editVehicle(vehicle: UpdateVehicle){
    this.openCloseEditModal();
    this._eventsService.getVehicles(vehicle);
  }

  removeVehicle(id: number){
    if (confirm('¿ Eliminar vehiculo ?')) {
      this._vehicleService.removeVehicle(this.token, id).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Vehiculo eliminado correctamente',
            position: 'topRight'
          });
          this.getVehicles();
        }, 
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        })
    }
  }

  openCloseEditModal() {
    this.btnEditModal.nativeElement.click();
  }

}
