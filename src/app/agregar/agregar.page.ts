import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  newGame: Game = {
    id: 0,
    title: '',
    genre: '',
    platform: '',
    releaseYear: 0,
    imageUrl: ''
  };

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async agregarJuego() {
    if (!this.newGame.title || !this.newGame.genre || !this.newGame.platform || !this.newGame.releaseYear || !this.newGame.imageUrl) {
      const alert = await this.alertController.create({
        header: 'Campos vacíos',
        message: 'Favor de llenar todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const games = this.localStorageService.getGames();

    if (games.some(game => game.title === this.newGame.title)) {
      const alert = await this.alertController.create({
        header: 'Título duplicado',
        message: 'Ya existe un juego con el mismo título.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const newId = games.length > 0 ? Math.max(...games.map(game => game.id)) + 1 : 1;
    this.newGame.id = newId;

    games.push(this.newGame);
    if (await this.localStorageService.saveGames(games)) {

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se agregó el juego exitosamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      // Limpiar las variables después de agregar el juego exitosamente
      this.newGame = {
        id: 0,
        title: '',
        genre: '',
        platform: '',
        releaseYear: 0,
        imageUrl: ''
      };
      this.router.navigate(['/principal']);
    }

  }

  cancelar() {
    // Limpiar las variables al cancelar
    this.newGame = {
      id: 0,
      title: '',
      genre: '',
      platform: '',
      releaseYear: 0,
      imageUrl: ''
    };
    this.router.navigate(['/principal']);
  }
}
