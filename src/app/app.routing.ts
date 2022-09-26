import { DriversListComponent } from './components/drivers/drivers-list/drivers-list.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { VehiclesListComponent } from './components/vehicles/vehicles-list/vehicles-list.component';
import { RoutesListComponent } from './components/routes/routes-list/routes-list.component';

const appRoute : Routes = [
    {
        path: '', 
        component: LoginComponent
    },
    {
        path: 'register', 
        component: RegisterComponent
    },
    {
        path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'drivers',
        component: DriversListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'vehicles',
        component: VehiclesListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'routes',
        component: RoutesListComponent,
        canActivate: [AuthGuard]
    },

    // Ruta de respaldo
    { path: 
        '**', 
        component: LoginComponent 
    },

]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);