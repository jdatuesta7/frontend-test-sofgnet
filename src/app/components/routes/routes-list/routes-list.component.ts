import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Route } from 'src/app/models/routes/Route';
import { EventsService } from 'src/app/services/events.service';
import { RoutesService } from 'src/app/services/routes.service';

declare var iziToast: any;

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {
  @ViewChild('asBtnEditModal') btnEditModal: ElementRef|any;

  token: string = this._cookieService.get('token');
  routes: Array<Route> = [];

  constructor(
    private _routesService: RoutesService,
    private _cookieService: CookieService,
    private _eventsService: EventsService
  ) { 
    this._eventsService.$refreshRoutes.subscribe((from) => {
      this.getRoutes();

      if (from === 'edit') {
        this.btnEditModal.nativeElement.click();
      }
    });
  }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(){
    this._routesService.getRoutes(this.token).subscribe(
      response => {
        this.routes = response;
        console.log(this.routes);
      }, 
      error => {
        console.log(error);
      })
  }

  editRoute(route: Route){
    this.btnEditModal.nativeElement.click();
    this._eventsService.getRoutes(route);
  }

  removeRoute(id: number){
    if (confirm('¿ Eliminar ruta ?')) {
      this._routesService.removeRoute(this.token, id).subscribe(
        response => {
          iziToast.success({
            title: 'Ok',
            message: 'Ruta eliminada correctamente',
            position: 'topRight'
          });
          this.getRoutes();
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        }
      );
    }
  }

}
