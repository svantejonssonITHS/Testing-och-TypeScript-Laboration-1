// External dependencies
import { Controller, Post, Headers, Query, Get } from '@nestjs/common';

// Internal dependencies
import { Game } from '_packages/shared/types/src';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Post()
	async createGame(@Headers('Authorization') authorization: string): Promise<Game> {
		return await this.gameService.createGame(authorization);
	}

	@Get()
	async checkGameId(
		@Headers('Authorization') authorization: string,
		@Query('gameId') gameId: string
	): Promise<boolean> {
		return await this.gameService.checkGameId(authorization, gameId);
	}
}
