import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

declare var iziToast: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string = '';
  email : string = '';
  password : string = '';
  token: any;

  constructor(
    private _authService: AuthService,
    private _cookieService: CookieService,
    private _router: Router,
    ) {
    if (this._cookieService.check('token')) {
      this.token = this._cookieService.get('token');
    }
   }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/home']);
    }
  }

  register(registerForm:any){
    if (registerForm.valid) {
      const user : User = {
        name : this.name,
        email: this.email,
        password: this.password
      };

      this._authService.register(user).subscribe( 
        response => {
          console.log(response);
          iziToast.success({
            title: 'Ok',
            message: 'Te has registrado',
            position: 'topRight'
          });
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error,
            position: 'topRight'
          });
        });
    }else{
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'Formulario invalido'
      });
    }
  }

}
