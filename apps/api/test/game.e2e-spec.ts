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
	jest.setTimeout(25 * 1000);
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

		socket.on(_gameId, (data: Game) => {
			expect(data).toBeDefined();
			expect(data.id).toBe(_gameId);
			expect(data.players).toHaveLength(1);
			expect(data.players[0].id).toBeDefined();

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

		socket.on(_gameId, (data: Game) => {
			expect(data).toBeDefined();
			expect(data.id).toBe(_gameId);
			expect(data.options).toEqual(options);

			done();
		});
	});

	it('should be able to start a round and answer a question', (done: jest.DoneCallback) => {
		socket.emit('event', {
			gameId: _gameId,
			type: 'startRound'
		});

		socket.on(_gameId, (data: Game) => {
			expect(data).toBeDefined();
			expect(data).toHaveProperty('id');
			expect(data.id).toBe(_gameId);
			expect(data).toHaveProperty('stage');
			expect(data).toHaveProperty('activeQuestion');
			expect(data.activeQuestion).toHaveProperty('question');
			expect(data.activeQuestion).toHaveProperty('answers');
			expect(data.activeQuestion).toHaveProperty('sentAt');
			expect(data).toHaveProperty('options');
			expect(data.options).toHaveProperty('questionTime');

			if (data.stage === GameStage.QUESTION) {
				setTimeout(() => {
					socket.emit('event', {
						gameId: _gameId,
						type: 'playerAnswer',
						data: {
							answer: data.activeQuestion.answers[0]
						}
					});
					return;
				}, (QUESTION_INTRO_DURATION + data.options.questionTime - 1) * 1000);
			} else if (data.stage === GameStage.LEADERBOARD) {
				expect(data.activeQuestion).toHaveProperty('playerAnswers');
				expect(data.activeQuestion.playerAnswers).toHaveLength(1);
				expect(data.activeQuestion.playerAnswers[0]).toHaveProperty('isCorrect');
				expect(data.activeQuestion.playerAnswers[0]);
				expect(data).toHaveProperty('players');
				expect(data.players).toHaveLength(1);
				expect(data.players[0]).toHaveProperty('score');

				if (data.activeQuestion.playerAnswers[0].isCorrect) {
					expect(data.players[0].score).toBeGreaterThan(0);
				} else if (data.previousQuestions.length === 0) {
					expect(data.players[0].score).toBe(0);
				}

				expect(data).toHaveProperty('previousQuestions');
				expect(data).toHaveProperty('numberOfQuestions');

				console.log(data.previousQuestions.length, data.numberOfQuestions);

				if (data.previousQuestions.length + 1 === data.numberOfQuestions) {
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
