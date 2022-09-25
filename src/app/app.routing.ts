import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth.guard";

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
    { path: 
        '**', 
        component: LoginComponent 
    },

]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);