import calculateScore from './calculateScore';

describe('calculateScore', () => {
	it('should be defined', () => {
		expect(calculateScore).toBeDefined();
	});

	it('params are valid | should return a score', () => {
		expect(calculateScore(30, 0)).toBeGreaterThan(0);
	});

	it('params are valid | should return a score of 0', () => {
		expect(calculateScore(0, 30)).toBe(0);
	});

	// Question timer parameter

	it('questionTime is string | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore('30', 0)).toBe(0);
	});

	it('questionTime is number (-2) | should return a score of 0', () => {
		expect(calculateScore(-2, 0)).toBe(0);
	});

	it('questionTime is boolean (true) | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(true, 0)).toBe(0);
	});

	it('questionTime is boolean (false) | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(false, 0)).toBe(0);
	});

	it('questionTime is null | should return a score of 0', () => {
		expect(calculateScore(null, 0)).toBe(0);
	});

	it('questionTime is undefined | should return a score of 0', () => {
		expect(calculateScore(undefined, 0)).toBe(0);
	});

	it('questionTime is object | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore({}, 0)).toBe(0);
	});

	it('questionTime is array | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore([], 0)).toBe(0);
	});

	// Response time parameter

	it('responseTime is string | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, '0')).toBe(0);
	});

	it('responseTime is number (-2) | should return a score of 0', () => {
		expect(calculateScore(30, -2)).toBe(0);
	});

	it('responseTime is boolean (true) | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, true)).toBe(0);
	});

	it('responseTime is boolean (false) | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, false)).toBe(0);
	});

	it('responseTime is null | should return a score of 0', () => {
		expect(calculateScore(30, null)).toBe(0);
	});

	it('responseTime is undefined | should return a score of 0', () => {
		expect(calculateScore(30, undefined)).toBe(0);
	});

	it('responseTime is object | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, {})).toBe(0);
	});

	it('responseTime is array | should return a score of 0', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, [])).toBe(0);
	});

	// Streak parameter
	it('streak is number (0) | should return a score', () => {
		expect(calculateScore(30, 0, 0)).toBeGreaterThan(0);
	});

	it('streak is number (1) | should return a score', () => {
		expect(calculateScore(30, 0, 1)).toBeGreaterThan(0);
	});

	it('streak is number (2) | should return a score', () => {
		expect(calculateScore(30, 0, 2)).toBeGreaterThan(0);
	});

	it('streak is number (-2) | should return a score', () => {
		expect(calculateScore(30, 0, -2)).toBeGreaterThan(0);
	});

	it('streak is string | should return a score', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, 0, '0')).toBeGreaterThan(0);
	});

	it('streak is boolean (true) | should return a score', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, 0, true)).toBeGreaterThan(0);
	});

	it('streak is boolean (false) | should return a score', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, 0, false)).toBeGreaterThan(0);
	});

	it('streak is null | should return a score', () => {
		expect(calculateScore(30, 0, null)).toBeGreaterThan(0);
	});

	it('streak is undefined | should return a score', () => {
		expect(calculateScore(30, 0, undefined)).toBeGreaterThan(0);
	});

	it('streak is object | should return a score', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, 0, {})).toBeGreaterThan(0);
	});

	it('streak is array | should return a score', () => {
		// @ts-expect-error - testing invalid input
		expect(calculateScore(30, 0, [])).toBeGreaterThan(0);
	});
});

import checkWsEvent from './checkWsEvent';
import { Event } from '_packages/shared/types';

describe('checkWsEvent', () => {
	it('should be defined', () => {
		expect(checkWsEvent).toBeDefined();
	});

	it('valid event | should return true', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: {}
		};

		expect(checkWsEvent(test)).toBe(true);
	});

	it('event is empty | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = {};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is null | should return false', () => {
		const test: Event = null;

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is undefined | should return false', () => {
		const test: Event = undefined;

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is string | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = 'test';

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is number | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = 1;

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is boolean | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = true;

		expect(checkWsEvent(test)).toBe(false);
	});

	it('event is array | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = [];

		expect(checkWsEvent(test)).toBe(false);
	});

	it('data as null | should return true', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: null
		};

		expect(checkWsEvent(test)).toBe(true);
	});

	it('data as undefined | should return true', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: undefined
		};

		expect(checkWsEvent(test)).toBe(true);
	});

	it('data as string | should return false', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: 'test'
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('data as number 0 | should return false', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: 0
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('data as number 1 | should return false', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: 1
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('data as boolean | should return false', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: true
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('data as array | should return false', () => {
		const test: Event = {
			gameId: 'test',
			type: 'test',
			data: []
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('type is missing | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = {
			gameId: 'test'
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('gameId is missing | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = {
			type: 'test'
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('gameIdis missing && type is missing | should return false', () => {
		// @ts-expect-error - testing invalid input
		const test: Event = {
			data: {}
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('type is number | should return false', () => {
		const test: Event = {
			gameId: 'test',
			// @ts-expect-error - testing invalid input
			type: 0
		};

		expect(checkWsEvent(test)).toBe(false);
	});

	it('gameId is number | should return false', () => {
		const test: Event = {
			// @ts-expect-error - testing invalid input
			gameId: 0,
			type: 'test'
		};

		expect(checkWsEvent(test)).toBe(false);
	});
});

import createGameId from './createGameId';

describe('createGameId', () => {
	const idFormat: RegExp = /^[A-Z]{3}[0-9]{3}$/;

	it('should be defined', () => {
		expect(createGameId).toBeDefined();
	});

	it('param as empty array | should return a string with the format ABC123', () => {
		expect(createGameId([])).toMatch(idFormat);
	});

	it('param as array with one value | should return a string with the format ABC123', () => {
		expect(createGameId(['ABC123'])).toMatch(idFormat);
	});

	it('param as array with two values | should return a string with the format ABC123', () => {
		expect(createGameId(['ABC123', 'DCE456'])).toMatch(idFormat);
	});

	it('param as object | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId({})).toMatch(idFormat);
	});

	it('param as string | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId('ABC123')).toMatch(idFormat);
	});

	it('param as number (123) | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId(123)).toMatch(idFormat);
	});

	it('param as number (-123) | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId(-123)).toMatch(idFormat);
	});

	it('param as zero | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId(0)).toMatch(idFormat);
	});

	it('param as boolean (true) | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId(true)).toMatch(idFormat);
	});

	it('param as boolean (false) | should return a string with the format ABC123', () => {
		// @ts-expect-error - testing invalid input
		expect(createGameId(false)).toMatch(idFormat);
	});

	it('param as null | should return a string with the format ABC123', () => {
		expect(createGameId(null)).toMatch(idFormat);
	});

	it('param as undefined | should return a string with the format ABC123', () => {
		expect(createGameId(undefined)).toMatch(idFormat);
	});

	it('param not included | should return a string with the format ABC123', () => {
		expect(createGameId()).toMatch(idFormat);
	});
});
