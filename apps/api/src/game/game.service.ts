// External dependencies
import { Injectable } from '@nestjs/common';

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

@Injectable()
export class GameService {
	games: Game[] = [];

	async createGame(authorization: string): Promise<Game> {
		const host: Player = await getAuth0User(authorization);

		const id: string = createGameId(this.games.map((game: Game) => game.id));

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
			options,
			questions: [],
			players: [],
			host
		};

		this.games.push(game);

		return game;
	}
}
