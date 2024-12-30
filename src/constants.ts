import { Direction, Maturity } from './types/core';

export const STEP_SIZE = 1;

export const DIRECTIONS = [
  'up',
  'down',
  'left',
  'right',
  'up-left',
  'up-right',
  'down-left',
  'down-right',
] as Direction[];

export const MIN_ENERGY_FOR_REPRODUCE = 50;
export const SIMPLE_REPRODUCE_DELAY = 5000;
export const SIMPLE_CONSUME_DELAY = 1000;

export const maturityColors: Record<Maturity, string> = {
  [Maturity.Seed]: '#8B4513', // Brown for seeds
  [Maturity.Sprout]: '#228B22', // Green for sprout
  [Maturity.Growing]: '#32CD32', // Lime green for growing
  [Maturity.Mature]: '#FFD700', // Gold for mature
  [Maturity.Overripe]: '#A52A2A', // Reddish-brown for overripe
};

export const vegetableSize: Record<Maturity, number> = {
  [Maturity.Seed]: 2, // Brown for seeds
  [Maturity.Sprout]: 2, // Green for sprout
  [Maturity.Growing]: 3, // Lime green for growing
  [Maturity.Mature]: 3, // Gold for mature
  [Maturity.Overripe]: 5, // Reddish-brown for overripe
};

export const vegetableFertilizerLevel: Record<Maturity, number> = {
  [Maturity.Seed]: 0, // Brown for seeds
  [Maturity.Sprout]: 25, // Green for sprout
  [Maturity.Growing]: 60, // Lime green for growing
  [Maturity.Mature]: 75, // Gold for mature
  [Maturity.Overripe]: 5, // Reddish-brown for overripe
};

export const growingDelay: Record<Maturity, number> = {
  [Maturity.Seed]: 3000, // Brown for seeds
  [Maturity.Sprout]: 5000, // Green for sprout
  [Maturity.Growing]: 10000, // Lime green for growing
  [Maturity.Mature]: 20000, // Gold for mature
  [Maturity.Overripe]: 5000, // Reddish-brown for overripe
};
