import { WORLD_SIZE } from '../main';
import { DIRECTIONS, MIN_ENERGY_FOR_REPRODUCE } from '../constants';

import type { Direction, Position } from '../types/core';
import type AbstractEntity from '../core/abstracts/abstractEntity';
import type AbstractResource from '../core/abstracts/abstractResource';

export const decideDirection = (): Direction => {
  return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
};

export const findNearestResource = (
  position: Position,
  resources: AbstractResource[]
): Position | null => {
  let minDistance = Infinity;
  let nearest = null;

  resources.forEach((resource) => {
    // Calculate Euclidean distance
    const dx = resource.position.x - position.x;
    const dy = resource.position.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if this resource is within 15 units distance
    if (distance <= 15 && distance < minDistance) {
      minDistance = distance;
      nearest = resource;
    }
  });

  return nearest;
};

export const directionTowards = (from: Position, to: Position): Direction => {
  let dx = to.x - from.x;
  let dy = to.y - from.y;

  if (dx > 0 && dy > 0) return 'down-right';
  if (dx > 0 && dy < 0) return 'up-right';
  if (dx < 0 && dy > 0) return 'down-left';
  if (dx < 0 && dy < 0) return 'up-left';
  if (dx > 0) return 'right';
  if (dx < 0) return 'left';
  if (dy > 0) return 'down';
  if (dy < 0) return 'up';

  return DIRECTIONS[Math.floor(Math.random() * 8)];
};

export const isValidMove = (x: number, y: number): boolean => {
  return x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE;
};

export const hasEnoughEnergyForReproduce = (energy: number) => {
  return energy > MIN_ENERGY_FOR_REPRODUCE * 2 + 10; // TODO: should be dynamic value based on entities mature
};

export const actionDelay = async (
  entity: AbstractEntity,
  delayMS: number
): Promise<void> => {
  entity.isBusy = true;
  await new Promise((resolve) => setTimeout(resolve, delayMS));
  entity.isBusy = false;
};
