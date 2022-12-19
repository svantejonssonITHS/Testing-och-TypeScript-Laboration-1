classDiagram

class Main

class Routes {
-checkAuth() Promise~void~
}

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

class Toast {
+string title
+string message
}

Main <|-- Routes

Routes <|-- Landing

Landing <|-- GamePinInput
Landing <|-- HeroText
Landing <|-- Toast
