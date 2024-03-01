import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Game } from '../model/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  gameId: number = 0;
  game: Game | any;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = +params['id'];
      this.game = this.localStorageService.getGameById(this.gameId);
    });
  }


  editar(gameId: number) {
    this.router.navigate(['/editar', gameId]);
  }
  async borrar(gameId: number) {
    let validar = this.localStorageService.deleteGameById(gameId);
    if (await validar) {
      this.router.navigate(['/principal']);
    }
  }
}
