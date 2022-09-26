import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { DriversService } from './services/drivers.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { DriversListComponent } from './components/drivers/drivers-list/drivers-list.component';
import { DriversCreateComponent } from './components/drivers/drivers-create/drivers-create.component';
import { EventsService } from './services/events.service';
import { DriverEditComponent } from './components/drivers/driver-edit/driver-edit.component';
import { VehiclesListComponent } from './components/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesCreateComponent } from './components/vehicles/vehicles-create/vehicles-create.component';
import { VehiclesEditComponent } from './components/vehicles/vehicles-edit/vehicles-edit.component';
import { RoutesListComponent } from './components/routes/routes-list/routes-list.component';
import { RoutesCreateComponent } from './components/routes/routes-create/routes-create.component';
import { RoutesEditComponent } from './components/routes/routes-edit/routes-edit.component';
import { SchedulesViewComponent } from './components/schedules/schedules-view/schedules-view.component';
import { SchedulesCreateComponent } from './components/schedules/schedules-create/schedules-create.component';
import { SchedulesListComponent } from './components/schedules/schedules-list/schedules-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    DriversListComponent,
    DriversCreateComponent,
    DriverEditComponent,
    VehiclesListComponent,
    VehiclesCreateComponent,
    VehiclesEditComponent,
    RoutesListComponent,
    RoutesCreateComponent,
    RoutesEditComponent,
    SchedulesViewComponent,
    SchedulesCreateComponent,
    SchedulesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
