import './game.feature';
import { QUESTION_INTRO_DURATION } from '../../packages/shared/constants/src';
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(`I visit the page and login with Auth0`, () => {
	cy.log('Visit the page and login with Auth0');
	cy.visit(Cypress.env('CLIENT_URL'));
	cy.loginViaAuth0(Cypress.env('AUTH0_USERNAME'), Cypress.env('AUTH0_PASSWORD'));
});

Given(`I create a new game`, () => {
	cy.log('Create a new game');
	cy.get('button').contains('create your own game').click();
});

Given(`I update the question time and question count, then start the game`, () => {
	cy.log('Update question time and question count, then start the game');
	const numberOfQuestions = 2;

	cy.get('label').contains('Number of questions').next().type(`{selectall}${numberOfQuestions}`);
	cy.get('label').contains('Time per question').next().type('{selectall}10');
	cy.get('button').contains('Start game').click();
});

When(`I answer the question and move on to the next one until the game is over`, () => {
	const numberOfQuestions = 2;

	for (let i = 0; i < numberOfQuestions; i++) {
		cy.log('Answer the question, and then move on to the next one until the game is over');
		cy.wait((QUESTION_INTRO_DURATION + 1) * 1000);
		cy.get('button')
			.should('not.be.disabled')
			.then(($buttons) => {
				cy.wrap($buttons[Math.floor(Math.random() * $buttons.length)]).click();
			});

		cy.wait(10000);
		if (i < numberOfQuestions - 1) {
			cy.get('button').contains('Next round').click();
		} else {
			cy.get('button').contains('End game').click();
		}
	}
});

Then(`I check that the game is over`, () => {
	cy.log('Check that the game is over');
	cy.url().should('equal', Cypress.env('CLIENT_URL') + '/');
});
