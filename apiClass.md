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
        +checkHealth() Promise~HealthResult~
    }
    class HealthService {
        -MicroserviceHealthIndicatorOptions options
        +checkHealth() Promise~HealthResult~
    }

    class OptionModule
    class OptionController {
        constructor(OptionService optionService)
        +getOptions() Promise~Options~
    }
    class OptionService {
        +getOptions() Promise~Options~
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
    AuthGuard --|> Main

    AppModule <|-- HealthModule
    AppModule <|-- OptionModule
    AppModule <|-- GameModule

    HealthModule <|-- HealthController
    HealthModule <|-- HealthService

    HealthService --|> HealthController

    OptionModule <|-- OptionController
    OptionModule <|-- OptionService

    OptionService --|> OptionController

    GameModule <|-- GameGateway
    GameModule <|-- GameService
    GameModule <|-- GameController

    GameService --|> GameGateway
    GameService --|> GameController
