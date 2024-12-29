import type { Position } from '../../types/core';
import type AbstractEntity from './abstractEntity';
import AbstractResource from './abstractResource';

abstract class AbstractWorld {
  size: number;
  entities: AbstractEntity[];
  resources: AbstractResource[];

  constructor(size: number) {
    this.size = size;
    this.entities = [];
    this.resources = [];
  }

  abstract update(): void;
  abstract initWorld(): void;
  abstract randomPosition(): Position;
  abstract generateEntity(count: number): void;
  abstract generateResources(count: number): void;
}

export default AbstractWorld;
