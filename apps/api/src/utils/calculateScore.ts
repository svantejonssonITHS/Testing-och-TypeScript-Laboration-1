import { POINTS_POSSIBLE } from './env';

/**
 * @description Calculates score for question. Source of formula: https://support.kahoot.com/hc/en-us/articles/115002303908-How-points-work
 * @param questionTimer Time to answer question in seconds
 * @param responseTime Time it took to answer question in seconds
 * @param streak Current streak
 * @returns Score for question
 */
export default function calculateScore(questionTimer: number, responseTime: number, streak?: number): number {
	let score: number = responseTime / questionTimer;
	score /= 2;
	score = 1 - score;
	score *= POINTS_POSSIBLE;
	if (streak) {
		score *= 1 + streak * 0.1;
	}

	console.log(score);

	return Math.round(score);
}
