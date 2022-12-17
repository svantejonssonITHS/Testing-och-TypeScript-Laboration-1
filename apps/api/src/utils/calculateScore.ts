import { QUESTION_POINTS_POSSIBLE } from './env';

/**
 * @description Calculates score for question. Source of formula: https://support.kahoot.com/hc/en-us/articles/115002303908-How-points-work
 * @param questionTimer Time to answer question in seconds
 * @param responseTime Time it took to answer question in seconds
 * @param streak Current streak
 * @returns Score for question
 */
export default function calculateScore(questionTimer: number, responseTime: number, streak?: number): number {
	// Also check streak for invalid values
	const isInvalid: boolean =
		isNaN(questionTimer) ||
		isNaN(responseTime) ||
		questionTimer <= 0 ||
		responseTime < 0 ||
		typeof questionTimer !== 'number' ||
		typeof responseTime !== 'number';
	if (isInvalid) return 0;

	let score: number = responseTime / questionTimer;
	score /= 2;
	score = 1 - score;
	score *= QUESTION_POINTS_POSSIBLE;
	if (streak && streak > 0 && typeof streak === 'number') {
		score *= 1 + streak * 0.1;
	}

	return Math.round(score);
}
