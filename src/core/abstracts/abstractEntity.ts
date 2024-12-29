import type { Position } from '../../types/core';
import type AbstractWorld from './abstractWorld';

abstract class AbstractEntity {
  id: string;
  energy: number;
  health: number;
  position: Position;

  isBusy = false;
  isAlive = true;
  metabolismRate = 0.5;

  constructor(id: string, position: Position, energy = 100, health = 100) {
    this.id = id;
    this.energy = energy;
    this.health = health;
    this.position = position;
  }

  abstract eliminate(): void;
  abstract move(world: AbstractWorld): void;
  abstract decisionMaker(world: AbstractWorld): void;
  abstract reproduce(): Promise<AbstractEntity | null>;
  abstract consume(world: AbstractWorld): Promise<void>;

  set positionCoords(newPosition: Position) {
    this.position = newPosition;
  }
}

export default AbstractEntity;
