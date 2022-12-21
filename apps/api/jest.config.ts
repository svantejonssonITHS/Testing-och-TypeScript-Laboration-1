// External dependencies
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Internal dependencies
import { compilerOptions } from './tsconfig.json';

const config: Config = {
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../' })
};

export default config;
