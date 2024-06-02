export type Deck = number[];

export type DiscardPile = number[];

export type Card = number | undefined;

export type Column = [Card, Card, Card];

export type Board = Column[];

export type SystemCard = {
  value: number;
  isShown: boolean;
};

export type SystemColumn = [SystemCard, SystemCard, SystemCard];

export type SystemBoard = SystemColumn[];

export type Turn = {
  action: 'takeFromDiscardPile' | 'draw' | 'takeFromDrawPile' | 'flip';
  location?: [number, number];
};

export type Result = {
  points1: number;
  points2: number;
  turns: number;
};

export type Bot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: number,
  drawCard: Card,
  discardPile: DiscardPile
) => Turn;
