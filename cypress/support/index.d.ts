/// <reference types="cypress" />
declare namespace Cypress {
	interface Chainable<Subject = any> {
		loginViaAuth0(username: string, password: string): Chainable<null>;
	}
}
