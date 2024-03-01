import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Game } from '../model/game.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  gameId: number = 0;
  game: Game | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = +params['id'];
      this.game = this.localStorageService.getGameById(this.gameId);
    });
  }

  async Guardar() {
    if (!this.game.title || !this.game.genre || !this.game.platform || !this.game.releaseYear || !this.game.imageUrl) {
      const alert = await this.alertController.create({
        header: 'Campos vacíos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    if (this.localStorageService.isTitleDuplicate(this.gameId, this.game.title)) {
      const alert = await this.alertController.create({
        header: 'Título duplicado',
        message: 'Ya existe un juego con el mismo título.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    this.localStorageService.updateGame(this.gameId, this.game);

    this.router.navigate(['/principal']);
  }

  Cancelar() {
    this.router.navigate(['/principal']);
  }
}
