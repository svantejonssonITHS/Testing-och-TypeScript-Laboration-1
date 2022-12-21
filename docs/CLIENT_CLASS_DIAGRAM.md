[← Go back](../README.md)

# API Class Diagram

```mermaid
classDiagram
class Main

class Routes {
-checkAuth() Promise~void~
}

Main <|-- Background
Main <|-- Routes

Routes <|-- Landing
Routes <|-- Game

%% General components
class Background {
+JSX.Element children
}

class Button {
+JSX.Element | string children
+onClick() void
+ButtonVariant variant?
+boolean disabled?
}

class Player {
+Player player
+GameStage gameStage
+string status?
+number position?
}

%% Landing route + components + relations
class Landing

class GamePinInput {
+string value
+setValue(string value) void
+boolean disabled?
+onSubmit() void
}

class HeroText {
+string text
}

Landing <|-- GamePinInput
Landing <|-- HeroText

%% Game routes
class Game

%% Lobby route + components + relations
class Lobby {
+Game | undefined game
}

class Form {
+Option | undefined options
+GameOptions | undefined gameValues
+boolean isHost
}

class Check {
+string label
+boolean checked
+boolean disabled
+onClick(boolean value) void
}

class Number {
+string label
+number | undefined value
+number min
+number max
+boolean disabled?
+onChange(boolean | undefined value) void
}

class Select {
+string label
+Item[] options
+string | undefined selectedValue
+boolean disabled?
+onChange(string | undefined value) void
}

class PlayerList {
+Game | undefined game
}

class ShareCard {
+string gamePin
+boolean show
}

class Title {
+string children
}

Lobby <|-- Button

Lobby <|-- PlayerList
Lobby <|-- ShareCard
Lobby <|-- Form

Form <|-- Select
Form <|-- Number
Form <|-- Check
Form <|-- Title

PlayerList <|-- Player

%% Leaderboard route + relations
class Leaderboard {
+Game | undefined game
}

Leaderboard <|-- Player
Leaderboard <|-- Button

%% Question route + components + relations
class Question {
+Game | undefined game
}

class Timer {
+number countUp
+number countDown
+onCountUpEnd() void
}

Question <|-- Timer

%% Game route realtions
Game <|-- Question
Game <|-- Leaderboard
Game <|-- Lobby
```
