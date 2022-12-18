import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		testEnvironment: 'jsdom',
		moduleNameMapper: {
			'\\.css$': 'identity-obj-proxy'
		},
		setupFilesAfterEnv: ['<rootDir>/src/test/helpers/setup.helper.ts']
	};
};
