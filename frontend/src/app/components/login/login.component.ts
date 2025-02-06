import { RendererService } from './../json-forms-custom-renders/ng-zorro/renderers.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth.services';
import { UserEnt } from '@shared/contracts/user-ent-contracts';
import { loginSchemaData } from '@shared/schemas/login-schema';
import { LoginEnt } from '@shared/contracts/login-ent-contracts';
import CryptoJS from 'crypto-js';
import { ngZorroJsonFormsRenderersModule } from '../json-forms-custom-renders/ng-zorro/renderers.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ngZorroJsonFormsRenderersModule,
    NzLayoutModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  renderers;
  hide = true;
  userEnt!: UserEnt;
  data = { ...new LoginEnt };
  schema: any = loginSchemaData;
  uischema: any = {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Email"
      },
      {
        "type": "Control",
        "scope": "#/properties/password",
        "label": "Password",
        "options": {
          "format": "password"  // Muestra el campo como un campo de contraseña.
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/rememberme",
        "label": "Remember Me",
        "options": {
          "format": "checkbox"  // Muestra un checkbox para el campo de recordar sesión.
        }
      }
    ]
  }

  constructor(
    private authService: AuthGuard,
    private router: Router,
    private rendererService: RendererService,
  ) {
    this.renderers = this.rendererService.getRenderers()
  }

  onFormSubmit() {
    const user = {
      email: this.data.email,
      password: CryptoJS.AES.encrypt(this.data.password, 'secret key 123').toString(),
      rememberme: this.data.rememberme,
    };

    this.authService.login(user)
      .then(user => {
        if (user) {
          this.authService.isLoggedIn = true;
          let cookieMenu = localStorage.getItem('menuActive') || '/sell';
          this.router.navigate([cookieMenu]);
        } else {
          // this.snackBarService.open("Los datos de acceso son incorrectos", 'Cerrar');
        }
      })
      .catch(() => {
        // this.snackBarService.open("Los datos de acceso son incorrectos", 'Cerrar');
      });
  }
}
