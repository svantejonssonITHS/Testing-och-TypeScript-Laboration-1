/// <reference types="cypress" />

// Command source: https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication#Login-with-cy-origin
function loginViaAuth0(username: string, password: string) {
	cy.visit('/');

	cy.origin(Cypress.env('AUTH0_DOMAIN'), { args: { username, password } }, ({ username, password }) => {
		cy.get('input#username').type(username);
		cy.get('input#password').type(password, { log: false });
		cy.contains('button[value=default]', 'Continue').click();
	});

	cy.url().should('equal', 'CLIENT_URL');
}

Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
	const log = Cypress.log({
		displayName: 'AUTH0 LOGIN',
		message: [`Authenticating: ${username}`],
		autoEnd: false
	});
	log.snapshot('before');

	loginViaAuth0(username, password);

	log.snapshot('after');
	log.end();
});
