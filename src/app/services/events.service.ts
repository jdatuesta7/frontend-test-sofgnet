import { UpdateDriver } from 'src/app/models/drivers/updateDriver';
import { EventEmitter } from "@angular/core";
import { UpdateVehicle } from '../models/vehicles/UpdateVehicle';
import { Route } from '../models/routes/Route';

export class EventsService {

    $refreshDrivers = new EventEmitter();
    refreshDriversList(from: string) {
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
    refreshVehiclesList(from: string) {
        this.$refreshVehicles.emit(from);
    }

    $refreshRoutes = new EventEmitter();
    refreshRoutesList(from: string) {
        this.$refreshRoutes.emit(from);
    }

    $getRoutes = new EventEmitter();
    getRoutes(route: Route) {
        this.$getRoutes.emit(route);
    }
}