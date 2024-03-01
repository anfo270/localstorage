import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private gamesKey = 'games';


    constructor(private alertController: AlertController) { }

    async saveGames(games: Game[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const invalidGames = games.filter(game => game.releaseYear <= 1972);

            if (invalidGames.length > 0) {
                const alert = await this.alertController.create({
                    header: 'Año de lanzamiento inválido',
                    message: 'El año de lanzamiento debe ser mayor a 1972.',
                    buttons: ['Aceptar']
                });
                await alert.present();
                resolve(false);
            } else {
                localStorage.setItem(this.gamesKey, JSON.stringify(games));
                resolve(true);
            }
        });
    }

    getGames(): Game[] {
        const gamesString = localStorage.getItem(this.gamesKey);
        return gamesString ? JSON.parse(gamesString) : [];
    }

    getGameById(id: number): Game | undefined {
        const games = this.getGames();
        return games.find(game => game.id === id);
    }
    updateGame(id: number, updatedGame: Game): void {
        let games = this.getGames();
        const index = games.findIndex(game => game.id === id);
        if (index !== -1) {
            games[index] = updatedGame;
            localStorage.setItem('games', JSON.stringify(games));
        }
    }
    async deleteGameById(id: number): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const alert = await this.alertController.create({
                header: 'Confirmar',
                message: '¿Estás seguro de que deseas borrar este juego?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            resolve(false); // El usuario ha cancelado, resolvemos la promesa con false
                        }
                    },
                    {
                        text: 'Aceptar',
                        handler: () => {
                            let games = this.getGames();
                            games = games.filter(game => game.id !== id); // Filtra el juego con el ID dado
                            localStorage.setItem(this.gamesKey, JSON.stringify(games)); // Guarda la lista actualizada sin el juego borrado
                            resolve(true); // El juego ha sido borrado, resolvemos la promesa con true
                        }
                    }
                ]
            });
            await alert.present();
        });
    }

    isTitleDuplicate(gameId: number, title: string): boolean {
        const games: Game[] = this.getGames();
        const filteredGames = games.filter(game => game.id !== gameId);
        return filteredGames.some(game => game.title.toLowerCase() === title.toLowerCase());
    }
}
