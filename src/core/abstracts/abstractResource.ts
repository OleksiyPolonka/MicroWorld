import { v4 as uuidv4 } from 'uuid';

import { Maturity, type Position } from '../../types/core';

abstract class AbstractResource {
  id: string;
  calories: number;
  position: Position;
  fertilizerLevel: number;
  maturity = Maturity.Seed;

  constructor(position: Position, fertilizerLevel: number, calories = 100) {
    this.id = uuidv4();
    this.calories = calories;
    this.position = position;
    this.fertilizerLevel = fertilizerLevel;
  }

  set positionCoords(newPosition: Position) {
    this.position = newPosition;
  }

  abstract growResource(): void;
  abstract reproduce(): void;
}

export default AbstractResource;
