classDiagram
class Main {
+bootstrap()
}

    %% Main module
    class AppModule

    %% Guards
    class AuthGuard {
        +canActivate(ExecutionContext context) Promise~boolean~
    }

    %% Information routes
    class HealthModule
    class HealthController {
        constructor(HealthService healthService)
        +getHealth() Promise~HealthCheckResult~
    }
    class HealthService {
        -MicroserviceHealthIndicatorOptions options
        +checkHealth() Promise~HealthCheckResult~
    }

    class OptionModule
    class OptionController {
        constructor(OptionService optionService)
        +getOptions() Promise~GameOptions~
    }
    class OptionService {
        +getOptions() Promise~GameOptions~
    }

    %% Game routes
    class GameModule
    class GameGateway {
        constructor(GameService gameService)
        +handleGame(GameInformation gameInformation)
    }
    class GameController {
        constructor(GameService gameService)
        +createGame(String hostId) Promise~GameInformation~
    }
    class GameService {
        -GameInformation[] games
        +startGame() Promise~StartGame~
        +nextQuestion() Promise~NewQuestion~
        +showLeaderbord() Promise~Leaderboard~
        +answerQuestion() Promise~QuestionAnswer~
        +endGame() Promise~EndGame~
    }

    %% Relations
    Main <|-- AppModule

    AppModule <|-- HealthModule
    AppModule <|-- OptionModule
    AppModule <|-- GameModule

    HealthModule <|-- HealthController
    HealthModule <|-- HealthService

    HealthController <|-- AuthGuard
    HealthService --|> HealthController

    OptionModule <|-- OptionController
    OptionModule <|-- OptionService

    OptionController <|-- AuthGuard
    OptionService --|> OptionController

    GameModule <|-- GameGateway
    GameModule <|-- GameService
    GameModule <|-- GameController

    GameGateway <|-- AuthGuard
    GameController <|-- AuthGuard

    GameService --|> GameGateway
    GameService --|> GameController
