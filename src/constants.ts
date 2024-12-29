import type { Direction } from './types/core';

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
