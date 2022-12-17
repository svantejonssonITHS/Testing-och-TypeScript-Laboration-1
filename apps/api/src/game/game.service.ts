// External dependencies
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal dependencies
import { Game, GameOptions, Player, Event, Question, PlayerAnswer } from '_packages/shared/types';
import { GameStage } from '_packages/shared/enums/src';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';
import {
	QUESTION_CATEGORY_DEFAULT,
	QUESTION_COUNT_DEFAULT,
	QUESTION_DIFFICULTY_DEFAULT,
	QUESTION_REGION_DEFAULT,
	QUESTION_TIME_DEFAULT
} from '$src/utils/env';
import getAuth0User from '$src/utils/getAuth0User';
import createGameId from '$src/utils/createGameId';
import getTriviaQuestions from '$src/utils/getTriviaQuestions';
import calculateScore from '$src/utils/calculateScore';

const _games: Game[] = [];

@Injectable()
export class GameService {
	async createGame(authorization: string): Promise<Game> {
		const host: Player = await getAuth0User(authorization);
		// Score and Streak is not needed for the host object
		delete host.score;
		delete host.streak;

		const id: string = createGameId(_games.map((game: Game) => game.id));

		const options: GameOptions = {
			questionCount: QUESTION_COUNT_DEFAULT,
			questionTime: QUESTION_TIME_DEFAULT,
			category: QUESTION_CATEGORY_DEFAULT,
			tag: undefined,
			region: QUESTION_REGION_DEFAULT,
			difficulty: QUESTION_DIFFICULTY_DEFAULT,
			isPrivate: true
		};

		const questions: Question[] = await getTriviaQuestions(options);

		const game: Game = {
			id,
			stage: GameStage.LOBBY,
			options,
			numberOfQuestions: questions.length,
			questions,
			previousQuestions: [],
			host,
			players: []
		};

		_games.push(game);

		return {
			...game,
			// Remove the questions from the game object, as we do not want to send them to the client
			questions: []
		};
	}

	async handleJoin(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) {
				throw new Error('Game not found');
			}

			if (game.options.isPrivate && player.id !== game.host.id) {
				throw new Error('Game is private');
			}

			if (game.stage !== GameStage.LOBBY) {
				throw new Error('Game is in progress');
			}

			const playerExists: boolean = game.players.some((player: Player) => player.id === player.id);

			if (playerExists) {
				throw new Error('Player is already in game');
			}

			if (game.players.length >= 10) {
				throw new Error('Game is full');
			}

			const isHost: boolean = player.id === game.host.id;

			if (isHost) player.isReady = true;

			game.players.push(player);

			client.emit(game.id, {
				...game,
				// Remove the questions from the game object, as we do not want to send them to the client
				questions: []
			});
		} catch (error) {
			console.log(error);
		}
	}

	async handleChangePlayerStatus(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) {
				throw new Error('Game not found');
			}

			const playerExists: boolean = game.players.some((gamePlayer: Player) => gamePlayer.id === player.id);

			if (!playerExists) {
				throw new Error('Player is not in game');
			}

			if (player.id !== game.host.id) {
				throw new Error('Host cannot change status');
			}

			game.players = game.players.map((gamePlayer: Player) => {
				if (gamePlayer.id === player.id) {
					gamePlayer.isReady = payload.data.isReady;
				}

				return gamePlayer;
			});

			client.emit(game.id, {
				...game,
				// Remove the questions from the game object, as we do not want to send them to the client
				questions: []
			});
		} catch (error) {
			console.log(error);
		}
	}

	async handleLeave(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) throw new Error('Game not found');

			const playerExists: boolean = game.players.some((gamePlayer: Player) => gamePlayer.id === player.id);

			if (!playerExists) throw new Error('Player is not in game');

			game.players = game.players.filter((gamePlayer: Player) => gamePlayer.id !== player.id);

			// Delete game if no players are left
			// Since the game is private as default, this will only happen if at least the host has joined previously
			if (game.players.length === 0) {
				_games.splice(_games.indexOf(game), 1);
			}

			client.emit(game.id, {
				...game,
				// Remove the questions from the game object, as we do not want to send them to the client
				questions: []
			});
		} catch (error) {
			console.log(error);
		}
	}

	async handleChangeOptions(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) {
				throw new Error('Game not found');
			}

			if (!game.players.some((gamePlayer: Player) => gamePlayer.id === player.id)) {
				throw new Error('Player is not in game');
			}

			if (player.id !== game.host.id) {
				throw new Error('Player is not host');
			}

			for (const key in payload.data.options) {
				if (payload.data.options[key] !== undefined) {
					game.options[key] = payload.data.options[key];
				}
			}

			if (Object.keys(payload.data.options).length === 0) throw new Error('No options changed');

			const questions: Question[] = await getTriviaQuestions(game.options);

			game.questions = questions;
			game.numberOfQuestions = questions.length;

			client.emit(game.id, {
				...game,
				// Remove the questions from the game object, as we do not want to send them to the client
				questions: []
			});
		} catch (error) {
			console.log(error);
		}
	}

	async handleStartRound(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) {
				throw new Error('Game not found');
			}

			if (!game.players.some((gamePlayer: Player) => gamePlayer.id === player.id)) {
				throw new Error('Player is not in game');
			}

			if (player.id !== game.host.id) {
				throw new Error('Player is not host');
			}

			if (!game.players.every((gamePlayer: Player) => gamePlayer.isReady)) {
				throw new Error('Not all players are ready');
			}

			if (game.stage === GameStage.QUESTION) {
				throw new Error('Round already started, wait for the leaderboard stage to start a new round');
			}

			if (game.questions.length === 0) {
				throw new Error('No questions left, game is over');
			}

			if (game.activeQuestion) {
				game.previousQuestions.push({ ...game.activeQuestion });
				game.activeQuestion = undefined;
			}

			game.activeQuestion = game.questions.shift();
			game.activeQuestion.sentAt = Date.now() + QUESTION_INTRO_DURATION * 1000;

			// Update game stage
			game.stage = GameStage.QUESTION;

			client.emit(game.id, {
				...game,
				// Remove the questions from the game object, as we do not want to send them to the client
				questions: [],
				// We do not want to send the correct answer for unanswered questions to the client
				activeQuestion: {
					...game.activeQuestion,
					correctAnswer: undefined
				}
			});

			setTimeout(() => {
				const gameAfterRound: Game = _games.find((game: Game) => game.id === payload.gameId);
				// Update game stage
				gameAfterRound.stage = GameStage.LEADERBOARD;

				client.emit(gameAfterRound.id, {
					...gameAfterRound,
					// Remove the questions from the game object, as we do not want to send them to the client
					questions: []
				});
			}, (game.options.questionTime + QUESTION_INTRO_DURATION) * 1000);
		} catch (error) {
			console.log(error);
		}
	}

	async handlePlayerAnswer(client: Socket, payload: Event): Promise<void> {
		try {
			const player: Player = await getAuth0User(client.handshake.headers.authorization);

			const game: Game = _games.find((game: Game) => game.id === payload.gameId);

			if (!game) {
				throw new Error('Game not found');
			}

			if (!game.players.some((gamePlayer: Player) => gamePlayer.id === player.id)) {
				throw new Error('Player is not in game');
			}

			if (game.stage !== GameStage.QUESTION || game.activeQuestion.sentAt > Date.now()) {
				throw new Error('Round is not active');
			}

			const alreadyAnswered: boolean = game.activeQuestion.playerAnswers.some(
				(playerAnswer: PlayerAnswer) => playerAnswer.playerId === player.id
			);

			if (alreadyAnswered) {
				throw new Error('Player has already answered');
			}

			const playerAnswer: PlayerAnswer = {
				playerId: player.id,
				answer: payload.data.answer,
				isCorrect: payload.data.answer === game.activeQuestion.correctAnswer,
				sentAt: Date.now()
			};

			game.activeQuestion.playerAnswers.push(playerAnswer);

			const playerIndex: number = game.players.findIndex((gamePlayer: Player) => gamePlayer.id === player.id);

			if (!playerAnswer.isCorrect) {
				game.players[playerIndex].streak = 0;
				throw new Error('Player answered incorrectly');
			}

			game.players[playerIndex].streak++;

			const timeTillAnswer: number = (playerAnswer.sentAt - game.activeQuestion.sentAt) / 1000;

			game.players[playerIndex].score += calculateScore(
				game.options.questionTime,
				timeTillAnswer,
				game.players[playerIndex].streak >= 3 ? game.players[playerIndex].streak : undefined
			);
		} catch (error) {
			console.log(error);
		}
	}
}
