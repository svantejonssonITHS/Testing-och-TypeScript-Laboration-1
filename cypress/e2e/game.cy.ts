import { QUESTION_INTRO_DURATION } from '../../packages/shared/constants';

describe('Domanda E2E', () => {
	it('Play a round of the game', () => {
		cy.log('Visit the page and login with Auth0');
		cy.visit(Cypress.env('CLIENT_URL'));
		cy.loginToAuth0(Cypress.env('AUTH0_USERNAME'), Cypress.env('AUTH0_PASSWORD'));

		cy.log('Create a new game');
		cy.get('button').contains('create your own game').click();

		cy.log('Update question time and question count, then start the game');
		const numberOfQuestions = 2;

		cy.get('label').contains('Number of questions').next().type(`{selectall}${numberOfQuestions}`);
		cy.get('label').contains('Time per question').next().type('{selectall}10');
		cy.get('button').contains('Start game').click();

		for (let i = 0; i < numberOfQuestions; i++) {
			cy.log('Answer the question, and then move on to the next one');
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

		cy.log('Check that the game is over');
		cy.url().should('equal', Cypress.env('CLIENT_URL') + '/');
	});
});
