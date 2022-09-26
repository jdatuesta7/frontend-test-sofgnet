import { CreateVehicle } from './CreateVehicle';

export interface UpdateVehicle extends CreateVehicle {
    id: number;
}