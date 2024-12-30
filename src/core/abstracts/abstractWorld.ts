import type { Position } from '../../types/core';
import type AbstractEntity from './abstractEntity';
import AbstractResource from './abstractResource';

abstract class AbstractWorld {
  size: number;
  entities: AbstractEntity[] = [];
  resources: AbstractResource[] = [];
  soilMap: number[][] = [];
  cellSize: number;

  constructor(size: number, cellSize = 1) {
    this.size = size;
    this.cellSize = cellSize;
  }

  abstract update(): void;
  abstract initWorld(): void;
  abstract initSoilMap(): void;
  abstract randomPosition(): Position;
  abstract generateEntity(count: number): void;
  abstract generateResources(count: number): void;
  abstract worldCleanUp(): void; // NOTE: Temporary solution for clean up
}

export default AbstractWorld;
