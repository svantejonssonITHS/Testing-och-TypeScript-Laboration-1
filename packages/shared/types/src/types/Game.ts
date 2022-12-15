type Game = {
	id: string;
	options: GameOptions;
	questions: Question[];
	players: Player[];
	host: Player;
};

type GameOptions = {
	isPrivate: boolean;
	category: string;
	tag: string;
	region: string;
	difficulty: string;
	questionCount: number;
	questionTime: number;
};

type Question = {
	id: string;
	question: string;
	correctAnswer?: string;
	answers: string[];
	playerAnswers?: PlayerAnswer[];
	timestamp?: number;
};

type Player = {
	id: string;
	name: string;
	email: string;
	profilePicture: string;
	score?: number;
	isReady?: boolean;
};

type PlayerAnswer = {
	playerId: string;
	answer: string;
	timestamp: number;
};

export { Game, GameOptions, Question, Player };
