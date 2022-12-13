import { Item } from '../';

type Game = {
	id: string;
	options: GameOptions;
	questions: Question[];
	players: Player[];
	host: Player;
};

type GameOptions = {
	categories: Item;
	tags: Item;
	regions: Item;
	difficulties: Item;
};

type Question = {
	question: string;
	correctAnswer?: string;
	answers: string[];
};

type Player = {
	id: string;
	name: string;
	score: number;
	profilePicture: string;
};

export { Game, GameOptions, Question, Player };
