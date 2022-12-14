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
	region: Item;
	difficulty: Item;
	questionCount: number;
	questionTime: number;
};

type Question = {
	question: string;
	correctAnswer?: string;
	answers: string[];
};

type Player = {
	id: string;
	name: string;
	email: string;
	profilePicture: string;
	score?: number;
};

export { Game, GameOptions, Question, Player };
