import { UpdateDriver } from 'src/app/models/drivers/updateDriver';
import { EventEmitter } from "@angular/core";

export class EventsService {

    $refreshDrivers = new EventEmitter();
    refreshDriversList(from: any) {
        this.$refreshDrivers.emit(from);
    }

    $getDriver = new EventEmitter();
    getDriver(driver: UpdateDriver) {
        this.$getDriver.emit(driver);
    }
}