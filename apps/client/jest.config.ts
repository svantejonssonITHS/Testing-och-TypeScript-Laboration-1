import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default async (): Promise<Config> => {
	return {
		testEnvironment: 'jsdom',
		moduleNameMapper: {
			'\\.css$': 'identity-obj-proxy',
			'\\.(svg)$': '<rootDir>/src/test/mocks/svg.mock.tsx',
			'\\env$': '<rootDir>/src/test/mocks/env.mock.ts',
			...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
		},
		setupFilesAfterEnv: ['<rootDir>/src/test/helpers/setup.helper.ts']
	};
};
