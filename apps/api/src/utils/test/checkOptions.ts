import { Options } from '_packages/shared/types/src';

export default function checkOptionsProperty(result: Options): void {
	expect(result).toBeDefined();
	expect(result).toBeInstanceOf(Object);

	for (const property of ['categories', 'tags', 'regions', 'difficulties']) {
		expect(result).toHaveProperty(property);
		expect(result[property]).toBeInstanceOf(Array);
		expect(result[property].length).toBeGreaterThan(0);
		expect(result[property][0]).toBeInstanceOf(Object);
		expect(result[property][0]).toHaveProperty('label');
		expect(result[property][0]).toHaveProperty('value');
	}
}
