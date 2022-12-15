// External dependencies
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal dependencies
import { Game, GameOptions, Player } from '_packages/shared/types/src';
import getAuth0User from '$src/utils/getAuth0User';
import createGameId from '$src/utils/createGameId';
import {
	QUESTION_CATEGORY_DEFAULT,
	QUESTION_COUNT_DEFAULT,
	QUESTION_DIFFICULTY_DEFAULT,
	QUESTION_REGION_DEFAULT,
	QUESTION_TIME_DEFAULT
} from '$src/utils/env';

const _games: Game[] = [];

@Injectable()
export class GameService {
	async createGame(authorization: string): Promise<Game> {
		const host: Player = await getAuth0User(authorization);

		const id: string = createGameId(_games.map((game: Game) => game.id));

		const options: GameOptions = {
			questionCount: QUESTION_COUNT_DEFAULT,
			questionTime: QUESTION_TIME_DEFAULT,
			category: QUESTION_CATEGORY_DEFAULT,
			tag: undefined,
			region: QUESTION_REGION_DEFAULT,
			difficulty: QUESTION_DIFFICULTY_DEFAULT
		};

		const game: Game = {
			id,
			isPrivate: true,
			options,
			questions: [],
			players: [],
			host
		};

		_games.push(game);

		return game;
	}

	async handleJoin(client: Socket, gameId: string): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === gameId);

			if (!game) throw new Error('Game not found');

			const playerExists: boolean = game.players.some((player: Player) => player.id === player.id);

			if (game.isPrivate && player.id !== game.host.id) throw new Error('Game is private');

			if (playerExists) throw new Error('Player is already in game');

			if (game.players.length >= 10) throw new Error('Game is full');

			game.players.push(player);

			client.emit(game.id, game);
		} catch (error) {
			console.log(error);
		}
	}

	async handleLeave(client: Socket, gameId: string): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === gameId);

			if (!game) throw new Error('Game not found');

			const playerExists: boolean = game.players.some((gamePlayer: Player) => gamePlayer.id === player.id);

			if (!playerExists) throw new Error('Player is not in game');

			game.players = game.players.filter((gamePlayer: Player) => gamePlayer.id !== player.id);

			// Delete game if no players are left
			// Since the game is private as default, this will only happen if at least the host has joined previously
			if (game.players.length === 0) {
				_games.splice(_games.indexOf(game), 1);
			}

			client.emit(game.id, game);
		} catch (error) {
			console.log(error);
		}
	}
}
