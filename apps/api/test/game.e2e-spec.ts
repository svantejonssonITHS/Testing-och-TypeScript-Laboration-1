// External dependencies
import * as request from 'supertest';
import { io, Socket } from 'socket.io-client';

// Internal dependencies
import checkGame from '$src/utils/test/checkGame';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';
import { JEST_TEST_PORT } from '$src/utils/env';
import { Game, GameOptions } from '_packages/shared/types/src';
import { GameStage } from '_packages/shared/enums/src';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';

let _gameId: string;

describe('GameController (e2e)', () => {
	it('/game (POST) Invalid token', async () => {
		return request(global.SERVER).post('/game').set('Authorization', `Bearer invalid_token`).expect(401);
	});

	it('/game (POST) Valid token', async () => {
		const token: string = await getAuth0AccessToken();

		return request(global.SERVER)
			.post('/game')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkGame(res.body);
				_gameId = res.body.id;
			});
	});
});

describe('GameGateway (e2e)', () => {
	jest.setTimeout(30 * 1000);
	let socket: Socket;

	beforeAll(async () => {
		socket = io(`http://localhost:${JEST_TEST_PORT}`, {
			extraHeaders: {
				authorization: `Bearer ${await getAuth0AccessToken()}`
			}
		});
	});

	afterAll(() => {
		socket.disconnect();
	});

	it('should join the game', (done: jest.DoneCallback) => {
		socket.emit('event', {
			gameId: _gameId,
			type: 'join'
		});

		socket.on(_gameId, (data: string) => {
			const game: Game = JSON.parse(data);

			expect(game).toBeDefined();
			expect(game.id).toBe(_gameId);
			expect(game.players).toHaveLength(1);
			expect(game.players[0].id).toBeDefined();

			done();
		});
	});

	it('should be able to change game options', (done: jest.DoneCallback) => {
		const options: GameOptions = {
			isPrivate: false,
			category: 'film',
			tag: 'james_bond',
			region: 'SE',
			difficulty: 'hard',
			questionCount: 2,
			questionTime: 5
		};

		socket.emit('event', {
			gameId: _gameId,
			type: 'changeOptions',
			data: {
				options
			}
		});

		socket.on(_gameId, (data: string) => {
			const game: Game = JSON.parse(data);

			expect(game).toBeDefined();
			expect(game.id).toBe(_gameId);
			expect(game.options).toEqual(options);

			done();
		});
	});

	it('should be able to start a round and answer a question', (done: jest.DoneCallback) => {
		socket.emit('event', {
			gameId: _gameId,
			type: 'startRound'
		});

		socket.on(_gameId, (data: string) => {
			const game: Game = JSON.parse(data);

			expect(game).toBeDefined();
			expect(game).toHaveProperty('id');
			expect(game.id).toBe(_gameId);
			expect(game).toHaveProperty('stage');
			expect(game).toHaveProperty('activeQuestion');
			expect(game.activeQuestion).toHaveProperty('question');
			expect(game.activeQuestion).toHaveProperty('answers');
			expect(game.activeQuestion).toHaveProperty('sentAt');
			expect(game).toHaveProperty('options');
			expect(game.options).toHaveProperty('questionTime');

			if (game.stage === GameStage.QUESTION) {
				setTimeout(() => {
					socket.emit('event', {
						gameId: _gameId,
						type: 'playerAnswer',
						data: {
							answer: game.activeQuestion.answers[0]
						}
					});
					return;
				}, (QUESTION_INTRO_DURATION + game.options.questionTime - 1) * 1000);
			} else if (game.stage === GameStage.LEADERBOARD) {
				expect(game.activeQuestion).toHaveProperty('playerAnswers');
				expect(game.activeQuestion.playerAnswers).toHaveLength(1);
				expect(game.activeQuestion.playerAnswers[0]).toHaveProperty('isCorrect');
				expect(game.activeQuestion.playerAnswers[0]);
				expect(game).toHaveProperty('players');
				expect(game.players).toHaveLength(1);
				expect(game.players[0]).toHaveProperty('score');

				if (game.activeQuestion.playerAnswers[0].isCorrect) {
					expect(game.players[0].score).toBeGreaterThan(0);
				} else if (game.previousQuestions.length === 0) {
					expect(game.players[0].score).toBe(0);
				}

				expect(game).toHaveProperty('previousQuestions');
				expect(game).toHaveProperty('numberOfQuestions');

				if (game.previousQuestions.length + 1 === game.numberOfQuestions) {
					done();
				} else {
					socket.emit('event', {
						gameId: _gameId,
						type: 'startRound'
					});
				}
			}
		});
	});
});
