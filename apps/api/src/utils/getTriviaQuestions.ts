import { AxiosResponse } from 'axios';
import { GameOptions, Question } from '_packages/shared/types/src';
import axios from './axios';
import { TRIVIA_API_URL } from './constants';

export default async function getTriviaQuestions(options: GameOptions): Promise<Question[]> {
	let queryString: string = '?';
	if (options.questionCount) queryString += `limit=${options.questionCount}`;
	if (options.category) queryString += `&categories=${options.category}`;
	if (options.tag) queryString += `&tags=${options.tag}`;
	if (options.region) queryString += `&region=${options.region}`;
	if (options.difficulty) queryString += `&difficulty=${options.difficulty}`;

	const response: AxiosResponse = await axios.get(TRIVIA_API_URL + '/questions' + queryString);

	if (response.status !== 200) throw new Error('Failed to get questions');

	return response.data.map((triviaQuestion: any) => ({
		id: triviaQuestion.id,
		question: triviaQuestion.question,
		answers: [triviaQuestion.correctAnswer, ...triviaQuestion.incorrectAnswers].sort(() => Math.random() - 0.5),
		correctAnswer: triviaQuestion.correctAnswer
	}));
}
