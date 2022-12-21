Feature: Game
  As a player,
  I want to be able to play a round of the game
  So that I can test the game's functionality

  Scenario: Play a round of the game
    Given I visit the page and login with Auth0
    And I create a new game
    And I update the question time and question count, then start the game
    When I answer the question and move on to the next one until the game is over
    Then I check that the game is over