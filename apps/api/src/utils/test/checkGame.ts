import { Game } from '_packages/shared-types/src';

export default function checkGame(game: Game): void {
	expect(game).toBeDefined();
	expect(game).toBeInstanceOf(Object);
	expect(game).toHaveProperty('id');
	expect(game).toHaveProperty('questions');
	expect(game.questions).toBeInstanceOf(Array);
	expect(game).toHaveProperty('players');
	expect(game.players).toBeInstanceOf(Array);
	expect(game).toHaveProperty('host');
	expect(game.host).toBeInstanceOf(Object);
	expect(game.host).toHaveProperty('id');
	expect(game.host).toHaveProperty('name');
	expect(game.host).toHaveProperty('email');
	expect(game.host).toHaveProperty('profilePicture');
	expect(game).toHaveProperty('options');
	expect(game.options).toBeInstanceOf(Object);
	expect(game.options).toHaveProperty('questionCount');
	expect(game.options).toHaveProperty('questionTime');
}
