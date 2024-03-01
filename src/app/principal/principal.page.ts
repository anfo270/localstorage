import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Game } from '../model/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuarioNombre: string | any;
  games: Game[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    var usuario = localStorage.getItem('usuario');
    if (usuario !== null) {
      this.usuarioNombre = JSON.parse(usuario).nom;
    }
  }

  ionViewWillEnter() {
    this.games = this.localStorageService.getGames();
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  agregarJuego() {
    this.router.navigate(['/agregar']);
  }

  editar(gameId: number) {
    this.router.navigate(['/editar', gameId]);
  }
  detalles(gameId: number) {
    this.router.navigate(['/detalles', gameId]);
  }
  async borrar(gameId: number) {
    let validar = this.localStorageService.deleteGameById(gameId);
    if (await validar) {
      this.ionViewWillEnter();
    }

  }
}
