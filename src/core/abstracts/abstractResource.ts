import type { Position } from '../../types/core';

abstract class AbstractResource {
  id: string;
  calories: number;
  position: Position;

  constructor(id: string, position: Position, calories = 100) {
    this.id = id;
    this.calories = calories;
    this.position = position;
  }

  set positionCoords(newPosition: Position) {
    this.position = newPosition;
  }
}

export default AbstractResource;
