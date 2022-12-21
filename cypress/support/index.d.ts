/// <reference types="cypress" />
declare namespace Cypress {
	interface Chainable<Subject = any> {
		loginToAuth0(username: string, password: string): Chainable<null>;
	}
}
