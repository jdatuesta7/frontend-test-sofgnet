import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DriversListComponent,
    DriversCreateComponent,
    DriverEditComponent
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
