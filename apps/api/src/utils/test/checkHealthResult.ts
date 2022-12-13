import { HealthResult } from '_packages/shared-types/src';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function checkHealthResult(result: HealthResult) {
	expect(result).toBeDefined();
	expect(result).toBeInstanceOf(Object);
	expect(result).toHaveProperty('status');
	expect(result).toHaveProperty('message');
	expect(result).toHaveProperty('uptime');
	expect(result).toHaveProperty('timestamp');
	expect(result).toHaveProperty('triviaApi');
	expect(result.triviaApi).toBeInstanceOf(Object);
	expect(result.triviaApi).toHaveProperty('status');
	expect(result.triviaApi).toHaveProperty('message');
}
