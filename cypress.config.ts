import { defineConfig } from 'cypress';
import { config } from 'dotenv';
import cucumber from 'cypress-cucumber-preprocessor';

config();

export default defineConfig({
	env: {
		CLIENT_URL: process.env.PUBLIC_CLIENT_URL,
		AUTH0_USERNAME: process.env.AUTH0_TEST_USERNAME,
		AUTH0_PASSWORD: process.env.AUTH0_TEST_PASSWORD,
		AUTH0_DOMAIN: process.env.PUBLIC_AUTH0_DOMAIN
	},
	e2e: {
		specPattern: ['cypress/e2e/*', 'cypress/integration/*'],
		setupNodeEvents(on) {
			on(
				'file:preprocessor',
				cucumber({
					typescript: require.resolve('typescript')
				})
			);
		}
	}
});
