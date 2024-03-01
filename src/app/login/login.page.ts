import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  FormularioLogin: FormGroup;

  constructor(
    private FB: FormBuilder,
    private alertController: AlertController,
    private router: Router // Inject Router
  ) {
    this.FormularioLogin = this.FB.group({
      Nombre: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  async inicio() {
    const f = this.FormularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);

      if (!f.Nombre || !f.Password) {
        const alert = await this.alertController.create({
          header: 'Usuario o Contraseña vacíos',
          message: 'Favor de ingresar el usuario y contraseñas correctas',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }

      if (usuario.nom === f.Nombre && usuario.pass === f.Password) {
        console.log('Ingresando');
        localStorage.setItem('ingresado', 'true');
        const alert = await this.alertController.create({
          header: 'Usuario correcto',
          message: 'Bienvenido',
          buttons: ['Aceptar']
        });
        await alert.present();

        this.router.navigate(['/principal']); // Correct navigation
      } else {
        const alert = await this.alertController.create({
          header: 'Usuario o Contraseña no coinciden',
          message: 'Favor verificar que el nombre de usuario y la contraseña coincidan',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Usuario no existe',
        message: 'Favor verificar que el usuario ingresado exista',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
