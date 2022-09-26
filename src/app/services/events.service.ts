import { UpdateDriver } from 'src/app/models/drivers/updateDriver';
import { EventEmitter } from "@angular/core";
import { UpdateVehicle } from '../models/vehicles/UpdateVehicle';

export class EventsService {

    $refreshDrivers = new EventEmitter();
    refreshDriversList(from: any) {
        this.$refreshDrivers.emit(from);
    }

    $getDriver = new EventEmitter();
    getDriver(driver: UpdateDriver) {
        this.$getDriver.emit(driver);
    }

    $getVehicles = new EventEmitter();
    getVehicles(vehicle: UpdateVehicle) {
        this.$getVehicles.emit(vehicle);
    }

    $refreshVehicles = new EventEmitter();
    refreshVehiclesList(from: any) {
        this.$refreshVehicles.emit(from);
    }
}