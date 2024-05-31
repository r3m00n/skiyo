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
  action: 'discardPile' | 'draw' | 'drawPile' | 'flip';
  location: [number, number];
};
