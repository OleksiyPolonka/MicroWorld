export interface Position {
  x: number;
  y: number;
}

export type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

export enum Maturity {
  Seed, // The resource is in its initial stage, representing potential growth but not usable yet.
  Sprout, // Early development, showing initial growth but still immature.
  Growing, // Actively developing, on its way to maturity but not ready for use.
  Mature, // Fully developed and ready to be harvested or used.
  Overripe, // The resource has passed its optimal usability stage but may still have some residual value.
}
