describe('empty spec', () => {
	it('passes', () => {
		cy.visit(Cypress.env('CLIENT_URL'));
		cy.loginToAuth0(Cypress.env('AUTH0_USERNAME'), Cypress.env('AUTH0_PASSWORD'));
	});
});
