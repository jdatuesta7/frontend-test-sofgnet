import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  token: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cookieService: CookieService
  ) {
    if (this._cookieService.check('token')) {
      this.token = this._cookieService.get('token');
      console.log(this.token);
    }

  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/home']);
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const user: Auth = {
        email: this.email,
        password: this.password
      };

      this._authService.login(user).subscribe(
        response => {
          if (response.access_token) {
            this._cookieService.set('token', response.access_token, 1, '/', '', true, 'Lax');
          }

          iziToast.success({
            title: 'Ok',
            message: 'has iniciado sesión',
            position: 'topRight'
          });

          this._router.navigate(['/home']);
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: error
          });
        });

    } else {
      iziToast.show({
        title: 'Error',
        position: 'topRight',
        message: 'Formulario invalido'
      });
    }
  }
}
