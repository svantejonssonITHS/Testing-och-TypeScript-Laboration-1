// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from '_packages/shared-types/src';
import checkGame from '$src/utils/test/checkGame';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

describe('GameController', () => {
	let controller: GameController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GameController],
			providers: [GameService]
		}).compile();

		controller = module.get<GameController>(GameController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should respond with Game object', async () => {
		const token: string = await getAuth0AccessToken();

		const game: Game = await controller.createGame(`Bearer ${token}`);

		checkGame(game);
	});
});
