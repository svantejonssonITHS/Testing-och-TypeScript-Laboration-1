// External dependencies
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Internal dependencies
import { compilerOptions } from '../tsconfig.json';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../' }),
	globalSetup: '<rootDir>/helpers/setupTests.helper.ts',
	globalTeardown: '<rootDir>/helpers/teardownTests.helper.ts'
};

export default config;
