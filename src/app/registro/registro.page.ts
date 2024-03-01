import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  FormularioRegistro: FormGroup | any;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) {
    this.FormularioRegistro = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required),
      'ConfirmacionPassword': new FormControl("", Validators.required),
    });
  }

  ngOnInit() { }

  async registrar() {
    var f = this.FormularioRegistro.value;

    // Verificar si algún campo está vacío
    if (!f.Nombre || !f.Password || !f.ConfirmacionPassword) {
      const alert = await this.alertController.create({
        header: "Datos Incorrectos",
        message: "Favor de llenar todos los campos",
        buttons: ["Aceptar"]
      });
      await alert.present();
      return;
    }
    if (f.Password !== f.ConfirmacionPassword) {
      const alert = await this.alertController.create({
        header: "Contraseñas no coinciden",
        message: "Favor verificar que ambas contraseñas sean indenticas",
        buttons: ["Aceptar"]
      });
      await alert.present();
      return;
    }

    var usuario = {
      nom: f.Nombre,
      pass: f.Password,
      compass: f.ConfirmacionPassword,
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mostrar mensaje de registro exitoso
    const successAlert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: '¡El usuario se ha registrado correctamente!',
      buttons: ['Aceptar']
    });
    await successAlert.present();

    this.router.navigate(['/login']);
  }
}
