import { Options } from '_packages/shared-types/src';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function checkOptionsProperty(result: Options, property: string) {
	expect(result).toHaveProperty(property);
	expect(result[property]).toBeInstanceOf(Array);
	expect(result[property].length).toBeGreaterThan(0);
	expect(result[property][0]).toBeInstanceOf(Object);
	expect(result[property][0]).toHaveProperty('label');
	expect(result[property][0]).toHaveProperty('value');
}
