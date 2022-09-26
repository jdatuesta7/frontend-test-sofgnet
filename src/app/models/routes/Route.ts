import { UpdateDriver } from "../drivers/UpdateDriver";
import { UpdateVehicle } from "../vehicles/UpdateVehicle";

export interface Route {
    id: number;
    description: string;
    driver: UpdateDriver;
    vehicle: UpdateVehicle;
}