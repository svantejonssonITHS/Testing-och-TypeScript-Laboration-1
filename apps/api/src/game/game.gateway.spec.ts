// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';

// Internal dependencies
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { Game } from '_packages/shared/types/src';
import { GameStage } from '_packages/shared/enums/src';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';

describe('GameGateway', () => {
	// Increase the timeout to 20 seconds
	jest.setTimeout(20 * 1000);

	let gateway: GameGateway;
	let token: string;
	let gameId: string;
	let client: Socket;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameGateway, GameService]
		}).compile();

		gateway = module.get<GameGateway>(GameGateway);

		// Create a game
		token = await getAuth0AccessToken();

		gameId = (await module.get<GameService>(GameService).createGame(`Bearer ${token}`)).id;

		// Create a client
		client = {
			handshake: { headers: { authorization: `Bearer ${token}` } },
			emit: () => true,
			broadcast: { emit: () => true }
		} as unknown as Socket;
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});

	it('host should be able to join their game', async () => {
		const game: Game | void = await gateway.handleEvent(client, { gameId, type: 'join' });

		expect(game).toBeDefined();
		// In case the game is undefined, the test will fail but typescript doesn't know that
		if (!game) return;

		expect(game).toHaveProperty('id', gameId);
		expect(game).toHaveProperty('stage');
		expect(game.stage).toBe(GameStage.LOBBY);
		expect(game).toHaveProperty('players');
		expect(game.players).toHaveLength(1);
		expect(game.players[0]).toHaveProperty('id');
		expect(game.players[0]).toHaveProperty('name');
		expect(game.players[0]).toHaveProperty('email');
		expect(game.players[0]).toHaveProperty('profilePicture');
		expect(game.players[0]).toHaveProperty('score');
		expect(game.players[0]).toHaveProperty('streak');
		expect(game.players[0]).toHaveProperty('isReady');
	});

	it('host should not be able to change their status', async () => {
		const game: Game | void = await gateway.handleEvent(client, {
			gameId,
			type: 'changePlayerStatus',
			data: { isReady: false }
		});

		expect(game).toBeUndefined();
	});

	it('host should be able to change their game options', async () => {
		const game: Game | void = await gateway.handleEvent(client, {
			gameId,
			type: 'changeOptions',
			data: {
				options: {
					isPrivate: false,
					category: 'film',
					tag: 'james_bond',
					region: 'SE',
					difficulty: 'hard',
					questionCount: 2,
					questionTime: 10
				}
			}
		});

		expect(game).toBeDefined();
		// In case the game is undefined, the test will fail but typescript doesn't know that
		if (!game) return;

		expect(game).toHaveProperty('id', gameId);
		expect(game).toHaveProperty('stage');
		expect(game.stage).toBe(GameStage.LOBBY);
		expect(game).toHaveProperty('options');
		expect(game.options).toHaveProperty('isPrivate', false);
		expect(game.options).toHaveProperty('category', 'film');
		expect(game.options).toHaveProperty('tag', 'james_bond');
		expect(game.options).toHaveProperty('region', 'SE');
		expect(game.options).toHaveProperty('difficulty', 'hard');
		expect(game.options).toHaveProperty('questionCount', 2);
		expect(game.options).toHaveProperty('questionTime', 10);
	});

	it('host should be able to start their game', async () => {
		// increase timeout to 10 seconds

		const game: Game | void = await gateway.handleEvent(client, { gameId, type: 'startRound' });

		expect(game).toBeDefined();
		// In case the game is undefined, the test will fail but typescript doesn't know that
		if (!game) return;

		expect(game).toHaveProperty('id', gameId);
		expect(game).toHaveProperty('stage');
		expect(game.stage).toBe(GameStage.QUESTION);
		expect(game).toHaveProperty('activeQuestion');
		expect(game.activeQuestion).toHaveProperty('id');
		expect(game.activeQuestion).toHaveProperty('question');
		expect(game.activeQuestion).toHaveProperty('answers');
		expect(game.activeQuestion).toHaveProperty('sentAt');

		// Wait for the question to end
		expect(game).toHaveProperty('options');
		expect(game.options).toHaveProperty('questionTime');

		await new Promise((resolve: any) =>
			setTimeout(resolve, (game.options.questionTime + QUESTION_INTRO_DURATION) * 1000)
		);
	});
});
