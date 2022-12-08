sequenceDiagram
actor U as User
participant DC as Domanda Client
participant DA as Domanda API
participant TA as The Trivia API
participant A0 as Auth0

    %% Login section
    U->>DC: Visits site
    loop
        DC->>DA: Request authentication
        DA->>A0: Send user token
        alt User is authenticated
            A0->>DA: Token is valid
            DA->>DC: Send access approved
        else User is unauthenticated
            A0->>DA: Token is invalid
            DA->>DC: Send access denied
            DC->>U: Redirect to Auth0 login page
            U->>A0: Provides login details to Auth0
            A0->>DC: Sends access token
        end
    end
    DC->>U: Redirect to Domanda landing page

    %% Join/Create game
    loop
        alt User creates new game
            U->>DC: Enters game pin
            DC->>DA: Validate game pin
            alt Game pin is valid
                break Game exists
                    DA->>DC: Sending game details
                end
            else Game pin is invalid
                DA->>DC: Access denied
                DC->>U: Display failed to connect message
            end
        else User creates new game
            U->>DC: Press create game button
            DC->>DA: Request a new game
            DA->>TA: Check Trivia API health
            alt Trivia API is online
                TA->>DA: Sends healthy response
                break Game is created
                    DA->>DC: Sends game details
                end
            else Trivia API is offline
                TA->>DA: Does not respond properly
                DA->>DC: Send game could not be created
                DC->>U: Display error
            end
        end
    end
    DC->>U: Redirect to game lobby

    %% Game lobby
    alt User is game host
        loop
            alt User changes game details
                U->>DC: User changes game details
                DC->>DA: Sends updated game details
            else Start game
                U->>DC: Press start game button
                DC->>DA: Request to start the game
                alt All players in lobby are ready
                    DA->>TA: Request questions
                    alt Questions exist for game settings
                        TA->>DA: Sends questions with answers
                        break Game starts
                            DA->>DC: Sends OK to start the game
                        end
                    else Questions does not exist for game settings
                        TA->>DA: Sends error response
                        DA->>DC: Sends error
                        DC->>U: Displays error message
                    end
                else Not all players are ready
                    DA->>DC: Sends error message
                    DC->>U: Displays error message
                end
            else User leaves game
            U->>DC: Presses the leave button
            DC->>DA: Close game session
            DC->>U: Redirects user to landing page
            end
        end
    else User is a participant
        alt User marks themselves as ready
            U->>DC: Presses ready button
            DC->>DA: Sends updated player status
        else User leaves the game
            U->>DC: Presses leave button
            DC->>DA: Request to remove user from session
            Note right of U: Since the user has left the lobby, the flow would start over
            DC->>U: Redirects user to landing page
        end
    end

    %% Quiz section
    loop
        DA->>DC: Sends question with answer alternatives
        DC->>U: Displays question introduction
        DC->>U: Displays question with answer alternatives
        U->>DC: Presses answer alternative
        DC->>DA: Sends user answer
        DA->>DC: Sends the correct answer and player points
        alt User is correct
            DC->>U: User is notified they were correct
        else User is incorrect
            DC->>U: User is notified they were correct
        end
        DC->>U: Moves player to the leaderboard screen
        alt Quiz has questions remaining
            alt User is game host
                U->>DC: Presses the continue button
                DC->>DA: Request new question
            end
        else Quiz has no more questions
            DC->>U: Displays the games winner on end screen
            U->>DC: Presses leave button
            DC->>DA: Sends user leave request
            DA->>DC: Removes user from session
            break Game has ended
                DC->>U: Redirect to landing page
            end
        end
    end
