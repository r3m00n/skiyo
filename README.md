# Skiyo TypeScript Card Game

This TypeScript project implements the card game Skyjo, providing a platform for developers to create and test their own bots to play against each other.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Bot Interface](#bot-interface)
- [Example Bot](#example-bot)
- [Game Logic](#game-logic)
- [Contributing](#contributing)

## Introduction

Skyjo is a strategic card game where players aim to minimize their score by swapping cards and building sets. This project offers a TypeScript implementation of Skyjo, allowing developers to write their own bots and compete against each other.

## Features

- **Bot Development**: Developers can create custom bots to compete in Skiyo games.
- **Bot Interface**: The project defines a clear interface for bot functions, making it easy for developers to implement their own strategies.
- **Game Logic**: The core game logic handles card management, player turns, and game outcomes.
- **Example Bot**: An example bot is provided to demonstrate bot implementation and usage.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/r3m00n/skiyo`
2. Install dependencies: `npm install`
3. Develop your bot by implementing the bot function according to the provided interface.
4. Run the game with your bot: `npm start`

## Bot Interface

Developers interact with the project primarily through the bot interface, which consists of a single function:

```typescript
type Bot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: number,
  drawCard: Card,
  discardPile: DiscardPile
) => Turn;
```

The `Bot` function receives the following parameters:

- `yourBoard`: The current state of your board represented as a 2D array.
- `opponentBoard`: The current state of your opponent's board represented as a 2D array.
- `discardCard`: The value of the card at the top of the discard pile.
- `drawCard`: The value of the card drawn from the draw pile, or `undefined` if the draw pile is empty.
- `discardPile`: The current state of the discard pile.

The `Bot` function returns a `Turn` object representing the bot's action for the current turn.

## Example Bot

An example bot, `randomBot`, is provided in the project to demonstrate bot implementation. Developers can use this bot as a reference when creating their own bots.

## Game Logic

The game logic is implemented in TypeScript and handles the core functionality of the Skyjo game. This includes dealing cards, processing player turns, and determining game outcomes.

## Contributing

Contributions to the project are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.
